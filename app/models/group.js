import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import {hasMany} from 'ember-data/relationships';

export default Model.extend({
  tour: attr('number'),
  score: attr('number', {defaultValue: 0}),
  players: hasMany('player', {
    inverse: 'groups'
  })
});
