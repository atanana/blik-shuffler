import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['inline'],

  actions: {
    saveData() {
      const data = localStorage['blik-shuffler'];
      const blob = new Blob([data], {type : 'application/json'});
    }
  }
});
