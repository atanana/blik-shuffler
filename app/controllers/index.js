import Ember from 'ember';

export default Ember.Controller.extend({
  gameStarted: Ember.computed('model.groups.@each.tour', function () {
    return !!this.get('model.groups')
      .map(group => group.get('tour'))
      .find(tour => tour > 0);
  })
});
