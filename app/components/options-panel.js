import Ember from 'ember';
import $ from "jquery";

export default Ember.Component.extend({
  classNames: ['inline'],

  openSettings: false,

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
    },

    updatePlayDouble(e) {
      if ($(e.target).is(':checked')) {
        this.set('model.notPlayTeammates', true);
      }

      this.set('model.notPlayDouble', !this.get('model.notPlayDouble'));
    }
  }
});
