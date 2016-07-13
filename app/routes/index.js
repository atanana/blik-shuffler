import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    savePlayers(players) {
      players.forEach(player => this.store.createRecord('player', player));
      var foundPlayers = this.store.findAll('player');
      console.log(foundPlayers);
    }
  }
});
