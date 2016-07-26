export function shufflePlayers(store, options) {
  return store.findAll('group').then(groups => {
    const notPlayDouble = options.get('notPlayDouble');
    const notPlayTeammates = options.get('notPlayTeammates');

    groups.filter(group => group.get('tour') !== 0)
      .forEach(group => group.destroyRecord());
    const initialGroups = groups.filter(group => group.get('tour') === 0).toArray();

    for (let tour = 1; tour <= options.get('toursCount'); tour++) {
      const tourGroups = [];
      let groupCounter = 1;
      const processPlayer = player => { // jshint ignore:line
        let group = findAppropriateGroup(player, tourGroups, notPlayDouble, notPlayTeammates);

        if (!group) {
          group = store.createRecord('group', {
            tour: tour,
            title: `Команда ${tour}-${groupCounter++}`
          });
          tourGroups.push(group);
        }

        group.get('players').pushObject(player);
        player.save();
      };

      preparePlayers(initialGroups).forEach(processPlayer);
      tourGroups.forEach(group => group.save());
    }
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

function findAppropriateGroup(player, groups, notPlayDouble, notPlayTeammates) {
  const playerGroups = extractPlayerGroups(player, notPlayDouble, notPlayTeammates);
  return groups.find(group => {
    let appropriate = false;

    const players = group.get('players').toArray();

    if (players.length < 6) {
      if (notPlayDouble || notPlayTeammates) {
        appropriate = !players.find(anotherPlayer => intersects(playerGroups, extractPlayerGroups(anotherPlayer, notPlayDouble, notPlayTeammates)));
      } else {
        appropriate = true;
      }
    }

    return appropriate;
  });
}

function extractPlayerGroups(player, notPlayDouble, notPlayTeammates) {
  if (notPlayDouble || notPlayTeammates) {
    let tourFilter = group => true; // jshint ignore:line
    if (notPlayTeammates && !notPlayDouble) {
      tourFilter = group => group.get('tour') === 0;
    }

    return player.get('groups')
      .filter(group => !group.get('isDeleted') && tourFilter(group))
      .map(group => group.id);
  } else {
    return [];
  }
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
