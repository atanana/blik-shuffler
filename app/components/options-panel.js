import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['inline'],

  openSettings: false,
  test: true,

  actions: {
    openSettings() {
      this.set('openSettings', true);
    },

    saveOptions() {
      this.get('model').save();
      this.set('openSettings', false);
    },

    onCloseInput() {
      this.set('openSettings', false);
      this.get('model').rollbackAttributes();
    }
  }
});
