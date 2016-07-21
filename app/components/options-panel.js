import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['inline'],

  actions: {
    update() {
      this.get('model').save();
    }
  }
});
