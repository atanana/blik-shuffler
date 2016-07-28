export function getOptions(store) {
  return store.findAll('options')
    .then(optionsEntities => {
      let options = optionsEntities.get('firstObject');

      if (!options) {
        options = store.createRecord('options', {
          toursCount: 6
        });
        options.save();
      }

      return options;
    });
}
