import Locale from '../Locale';

const lang = new Locale();

lang.set('terms', {
  create: 'Create',
}).set('app.sections', {
  recent: 'Recent',
  notebooks: 'Notebooks',
}).set('app.notebooks', {
  phrases: {
    createNotebook: 'Create Notebook',
    newNoteIn: 'New Note in ',
  },
}).set('app.search', {
  phrases: {
    placeholder: 'Serch Notes',
  },
}).set('errors', {
});

export const kvs = lang.flatten();

export default lang;
