import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['inline'],

  isFirst: Ember.computed('tour', function () {
    return this.get('tour') === 0;
  }),

  groups: Ember.computed('rawGroups', function () {
    const tour = this.get('tour');
    return this.get('rawGroups').filter(group => group.get('tour') === tour);
  }),

  actions: {
    updateGroupScore(group) {
      this.sendAction('updateGroup', group);
    }
  }
});
