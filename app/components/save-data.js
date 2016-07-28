import Ember from 'ember';
import {todayName} from '../files/filename_utils';

export default Ember.Component.extend({
  classNames: ['inline'],

  actions: {
    saveData() {
      const data = localStorage['blik-shuffler'];
      const blob = new Blob([data], {type : 'application/json'});
      saveAs(blob, todayName() + '.json'); // jshint ignore:line
    }
  }
});
