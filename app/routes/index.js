import Ember from 'ember';
import {shufflePlayers} from '../shuffle/shuffle';

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
      shufflePlayers(this.store, this.controller.get('model.options'))
        .then(() => this.updateGroups());
    }
  }
});
