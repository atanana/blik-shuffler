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
      alert('shuffle players!');
    }
  }
});
