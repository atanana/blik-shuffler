import Ember from 'ember';

export default Ember.Route.extend({
  currentTour: 0,

  model() {
    return this.store.findAll('group');
  },

  actions: {
    savePlayers(players) {
      const group = this.store.createRecord('group', {
        tour: 0
      });

      players.forEach(player => {
        const playerRecord = this.store.createRecord('player', player);
        playerRecord.get('groups').pushObject(group);
        playerRecord.save();
      });

      group.save();

      this.controller.set('model', this.model());
    },

    clearPlayers() {
      alert('clear players!');
    },

    shufflePlayers() {
      const tour = this.get('currentTour') + 1;
      this.set('currentTour', tour);
      this.store.findAll('player').then(data => {
        const players = data.toArray();
        this.store.findAll('group').then(groups => {
          const initialGroups = groups.filter(group => group.get('tour') === 0).toArray();
          const groupsCount = Math.max(Math.ceil(players.length / 6), initialGroups.length);
          const newGroups = [];

          for (let i = 0; i < groupsCount; i++) {
            newGroups.push(this.store.createRecord('group', {
              tour: tour
            }));
          }

          players.forEach(player => {
            const group = findAppropriateGroup(player, newGroups);

            if (group) {
              group.get('players').pushObject(player);
            } else {
              alert(`Не удаётся распределить игрока ${player.get('name')}!`);
            }

            player.save();
          });

          newGroups.forEach(group => group.save());

          this.controller.set('model', this.model());
        });
      });
    }
  }
});

function findAppropriateGroup(player, groups) {
  const playerGroups = extractPlayerGroups(player);
  return groups.find(group => {
    let appropriate = false;
    const players = group.get('players').toArray();

    if (players.length < 6) {
      appropriate = !players.find(anotherPlayer => intersects(playerGroups, extractPlayerGroups(anotherPlayer)));
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
