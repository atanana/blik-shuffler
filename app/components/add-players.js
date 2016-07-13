import Ember from 'ember';

const $ = Ember.$;

export default Ember.Component.extend({
  openInput: false,

  actions: {
    openInput() {
      this.set('openInput', true);
    },

    onCloseInput() {
      this.set('openInput', false);
    },

    addPlayers() {
      this.set('openInput', false);

      const newPlayers = [];

      $('#new-players-table').find('tr')
        .each((i, tr) => {
          const inputs = $(tr).find('input');
          const name = inputs[0].value;
          const town = inputs[1].value;

          if (name) {
            newPlayers.push({
              name: name,
              town: town
            });
          }
        });

      this.sendAction('savePlayers', newPlayers);
    }
  }
});
