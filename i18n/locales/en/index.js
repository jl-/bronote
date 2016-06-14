import Locale from '../Locale';

const lang = new Locale();

lang.set('terms', {
  create: 'Create',
  cancel: 'Cancel',
  submit: 'Submit',
  confirm: 'Confirm',
}).set('app.sections', {
  recent: 'Recent',
  notebooks: 'Notebooks',
}).set('app.notebooks', {
  phrases: {
    createNotebook: 'Create Notebook',
    newNoteIn: 'New Note in ',
    notebookName: 'Notebook Name',
  },
}).set('app.search', {
  phrases: {
    placeholder: 'Serch Notes',
  },
}).set('errors', {
  NOTEBOOK_NAME_INVALID: 'notebook name at least 3 characters',
});

export const kvs = lang.flatten();

export default lang;
