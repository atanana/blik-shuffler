import Ember from 'ember';

export default Ember.Controller.extend({
  gameStarted: Ember.computed('model.groups.@each.tour', function () {
    return !!this.get('model.groups')
      .map(group => group.get('tour'))
      .find(tour => tour > 0);
  }),

  tours: Ember.computed('model.options.toursCount', function () {
    const tours = [];
    const toursCount = this.get('model.options.toursCount');

    for (let tour = 0; tour <= toursCount; tour++) {
      tours.push(tour);
    }

    return tours;
  })
});
