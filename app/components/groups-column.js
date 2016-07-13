import Ember from 'ember';

export default Ember.Component.extend({
  groups: Ember.computed('rawGroups', function () {
    const tour = this.get('tour');
    return this.get('rawGroups').filter(group => group.get('tour') === tour);
  })
});
