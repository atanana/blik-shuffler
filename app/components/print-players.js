import Ember from 'ember';
import {get_xlsx} from '../files/xlsx_utils';
import {todayName} from '../files/filename_utils';
import {getOptions} from '../data/entities_helper';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  classNames: ['inline'],

  actions: {
    printPlayers() {
      getOptions(this.get('store')).then(options => {
        const header = ['Игрок'];
        for (let i = 1; i <= options.get('toursCount'); i++) {
          header.push('Тур ' + i);
        }

        this.get('store').findAll('player').then(players => {
          const playersData = players.sortBy('name')
            .map(player => {
              const result = player.get('groups')
                .sortBy('tour')
                .map(group => {
                  const title = group.get('title');
                  return title.substr(title.lastIndexOf(' ') + 1);
                })
                .toArray();
              result[0] = player.get('name');
              return result;
            })
            .toArray();
          saveAs(get_xlsx([header].concat(playersData), "Таблица игроков"), todayName() + '.xlsx'); // jshint ignore:line
        });
      });
    }
  }
});
