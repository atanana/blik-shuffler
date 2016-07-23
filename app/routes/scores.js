import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('options')
      .then(optionsEntities => optionsEntities.get('firstObject'))
      .then(options => this.store.findAll('player')
        .then(players => getPlayersData(players, options)
          .then(players => {
            return {
              players: sortPlayers(players),
              options: options
            };
          })));
  }
});

function sortPlayers(players) {
  players.sort(function (player1, player2) {
    return player2.totalScore - player1.totalScore;
  });

  for (let i = 0; i < players.length;) {
    const currentScore = players[i].totalScore;
    let next = i + 1;
    let placeLabel = next;

    while (next < players.length && players[next].totalScore === currentScore) {
      next++;
    }

    if (next !== i + 1) {
      placeLabel += '-' + next;
    }

    for (let j = i; j < next; j++) {
      players[j].place = placeLabel;
    }

    i = next;
  }

  return players;
}

function getPlayersData(players, options) {
  return Ember.RSVP.all(
    players.map(player => player.get('groups')
      .then(groups => {
        const totalScore = groups.reduce(function (prev, current) {
          return prev + parseInt(current.get('score'));
        }, 0);

        const toursCount = options.get('toursCount');
        let scores = groups.sortBy('tour')
          .map(group => group.get('score'))
          .splice(1, groups.length - toursCount - 1);

        while (scores.length < toursCount) {
          scores.push(0);
        }

        return {
          name: player.get('name'),
          town: player.get('town'),
          totalScore: totalScore,
          scores: scores
        };
      }))
  );
}
