import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import Ember from 'ember';
// import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  toursCount: attr('number', {defaultValue: 0}),
  allGroups: attr('boolean', {defaultValue: false}),
  notAllGroups: Ember.computed.not('allGroups')
});
