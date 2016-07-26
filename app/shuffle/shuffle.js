export function shufflePlayers(store, options) {
  return store.findAll('group').then(groups => {
    groups.filter(group => group.get('tour') !== 0)
      .forEach(group => group.destroyRecord());
    const initialGroups = groups.filter(group => group.get('tour') === 0).toArray();

    const newGroups = [];

    for (let tour = 1; tour <= options.get('toursCount'); tour++) {
      let groupCounter = 1;
      const processPlayer = player => { // jshint ignore:line
        let group = findAppropriateGroup(player, newGroups, tour);

        if (!group) {
          group = store.createRecord('group', {
            tour: tour,
            title: `Команда ${tour}-${groupCounter++}`
          });
          newGroups.push(group);
        }

        group.get('players').pushObject(player);
        player.save();
      };

      preparePlayers(initialGroups).forEach(processPlayer);
    }

    newGroups.forEach(group => group.save());
  });
}

function preparePlayers(initialGroups) {
  const groups = shuffle(initialGroups).map(group => shuffle(group.get('players').toArray()));
  const players = [];
  let hasPlayers = true;
  const getPlayer = function (group) {
    const player = group.pop();

    if (player) {
      players.push(player);
      hasPlayers = true;
    }
  };

  while (hasPlayers) {
    hasPlayers = false;
    groups.forEach(getPlayer);
  }

  return players;
}

function findAppropriateGroup(player, groups, tour) {
  const playerGroups = extractPlayerGroups(player);
  return groups.find(group => {
    let appropriate = false;

    if (group.get('tour') === tour) {
      const players = group.get('players').toArray();

      if (players.length < 6) {
        appropriate = !players.find(anotherPlayer => intersects(playerGroups, extractPlayerGroups(anotherPlayer)));
      }
    }

    return appropriate;
  });
}

function extractPlayerGroups(player) {
  return player.get('groups')
    .filter(group => !group.get('isDeleted'))
    .map(group => group.id);
}

function intersects(array1, array2) {
  return array1.filter(item => array2.indexOf(item) !== -1).length > 0;
}

function shuffle(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);

    counter--;

    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}
