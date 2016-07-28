import Ember from 'ember';
import {shufflePlayers} from '../shuffle/shuffle';
import {getOptions} from '../data/entities_helper';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
      groups: this.store.findAll('group'),
      options: getOptions(this.store)
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
        this.controller.set('model.groups', []);
      });
    },

    shufflePlayers() {
      shufflePlayers(this.store, this.controller.get('model.options'))
        .then(() => this.updateGroups());
    },

    updateModel() {
      getOptions(this.store)
        .then(options => {
          this.controller.set('model.options', options);
          this.updateGroups();
        });
    }
  }
});
