import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import {hasMany} from 'ember-data/relationships';

export default Model.extend({
  title: attr('string', {defaultValue: ''}),
  tour: attr('number'),
  score: attr('number', {defaultValue: 0}),
  players: hasMany('player', {
    inverse: 'groups'
  }),
  sortedPlayers: Ember.computed('players', function () {
    return this.get('players').sortBy('name');
  })
});
