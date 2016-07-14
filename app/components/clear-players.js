import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['inline'],
  
  actions: {
    clearPlayers() {
      if (confirm('Вы действительно хотите удалить всех игроков?')) {
        this.sendAction('clearPlayers');
      }
    }
  }
});
