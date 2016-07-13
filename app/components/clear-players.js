import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    clearPlayers() {
      this.sendAction('clearPlayers');
    }
  }
});
