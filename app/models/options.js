import Model from 'ember-data/model';
import attr from 'ember-data/attr';
// import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  toursCount: attr('number', {defaultValue: 0}),
  notPlayDouble: attr('boolean', {defaultValue: false}),
  notPlayTeammates: attr('boolean', {defaultValue: true})
});
