import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['inline'],

  actions: {
    shufflePlayers() {
      if (confirm('Вы действительно хотите перемешать игроков?')) {
        this.sendAction('shufflePlayers');
      }
    }
  }
});
