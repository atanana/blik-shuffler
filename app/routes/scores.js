import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('options')
      .then(optionsEntities => optionsEntities.get('firstObject'))
      .then(options => this.store.findAll('player')
        .then(players => Ember.RSVP.all(
          players.map(player => player.get('groups')
            .then(groups => {
              const totalScore = groups.reduce(function (prev, current) {
                return prev + parseInt(current.get('score'));
              }, 0);

              return {
                name: player.get('name'),
                totalScore: totalScore,
                scores: groups.sortBy('tour').map(group => group.get('score')).splice(1, groups.length - options.get('toursCount') - 1)
              };
            }))
        ).then(players => {
          return {
            players: players,
            options: options
          };
        })));
  }
});
