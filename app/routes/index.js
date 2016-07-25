import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
      groups: this.store.findAll('group'),
      options: this.store.findAll('options')
        .then(optionsEntities => {
          let options = optionsEntities.get('firstObject');

          if (!options) {
            options = this.store.createRecord('options', {
              toursCount: 6
            });
            options.save();
          }

          return options;
        })
    });
  },

  updateGroups: function () {
    this.controller.set('model.groups', this.store.findAll('group'));
  },

  actions: {
    savePlayers(players, coach) {
      const group = this.store.createRecord('group', {
        tour: 0,
        title: coach
      });

      players.forEach(player => {
        const playerRecord = this.store.createRecord('player', player);
        playerRecord.get('groups').pushObject(group);
        playerRecord.save();
      });

      group.save();

      this.updateGroups();
    },

    clearPlayers() {
      this.store.findAll('group').then(groups => {
        groups.forEach(group => group.destroyRecord());
        this.store.findAll('player').then(players => players.forEach(player => player.destroyRecord()));
        this.updateGroups();
      });
    },

    shufflePlayers() {
      this.store.findAll('group').then(groups => {
        groups.filter(group => group.get('tour') !== 0)
          .forEach(group => group.destroyRecord());

        this.store.findAll('player').then(data => {
          const players = data.toArray();
          const newGroups = [];

          for (let tour = 1; tour <= this.controller.get('model.options.toursCount'); tour++) {
            let groupCounter = 1;
            const processPlayer = player => { // jshint ignore:line
              let group = findAppropriateGroup(player, newGroups, tour);

              if (!group) {
                group = this.store.createRecord('group', {
                  tour: tour,
                  title: `Команда ${tour}-${groupCounter++}`
                });
                newGroups.push(group);
              }

              group.get('players').pushObject(player);
              player.save();
            };

            shuffle(players).forEach(processPlayer);
          }

          newGroups.forEach(group => group.save());

          this.updateGroups();
        });
      });
    }
  }
});

function findAppropriateGroup(player, groups, tour) {
  const playerGroups = extractPlayerGroups(player);
  return groups.find(group => {
    let appropriate = false;

    if (group.get('tour') === tour) {
      const players = group.get('players').toArray();

      if (players.length < 6) {
        appropriate = !players.find(anotherPlayer => intersects(playerGroups, extractPlayerGroups(anotherPlayer)));
      }
    }

    return appropriate;
  });
}

function extractPlayerGroups(player) {
  return player.get('groups').map(group => group.id);
}

function intersects(array1, array2) {
  return array1.filter(item => array2.indexOf(item) !== -1).length > 0;
}

function shuffle(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);

    counter--;

    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}
