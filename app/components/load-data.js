import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['inline'],

  actions: {
    loadData() {
      const files = document.getElementById('load-data-input').files;
      if (files.length > 0) {
        const reader = new FileReader();
        reader.onload = e => {
          localStorage['blik-shuffler'] = e.target.result;
          this.sendAction('updateModel');
        };
        reader.readAsText(files[0]);
      } else {
        alert('Выберите файл!');
      }
    }
  }
});
