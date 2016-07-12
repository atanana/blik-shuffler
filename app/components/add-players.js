import Ember from 'ember';

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

      $('#new-players-table').find('tr')
        .each((i, tr) => {
          const inputs = $(tr).find('input');
          const data = {
            name: inputs[0].value,
            town: inputs[1].value
          };
          console.log(data);
        });
    }
  }
});
