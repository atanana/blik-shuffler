import Ember from 'ember';

export default Ember.Controller.extend({
  tours: Ember.computed('model.options.toursCount', function () {
    const tours = [];
    const toursCount = this.get('model.options.toursCount');

    for (let tour = 1; tour <= toursCount; tour++) {
      tours.push(tour);
    }

    return tours;
  })
});
