import Ember from 'ember';

export default Ember.Route.extend({
  getOptions() {
    return this.store.findAll('options')
      .then(optionsEntities => optionsEntities.get('firstObject'));
  },

  model() {
    return Ember.RSVP.hash({
      players: this.store.findAll('player')
        .then(players => this.getOptions()
          .then(options => Ember.RSVP.all(
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
          ))),
      options: this.getOptions()
    });
  }
});
