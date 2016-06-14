import React, { Component } from 'react';
import cx from 'classnames';
import PaperInput from 'components/paper-form/input';
import styles from './style.scss';

const NAME_REF = Symbol('notebook name');

class NotebookEditor extends Component {
  constructor(props, context) {
    super(props, context);
    this.validateNotebookName = ::this.validateNotebookName;
    this.cancel = ::this.cancel;
    this.confirm = ::this.confirm;
  }
  validateNotebookName(name) {
    const isValid = name.length > 2;
    return isValid || __('errors.NOTEBOOK_NAME_INVALID');
  }
  getNotebookData() {
    const nameInput = this.refs[NAME_REF];
    const name = nameInput.getValue();
    const isNameValid = this.validateNotebookName(name) === true;
    if (isNameValid) {
      return { name };
    }
    nameInput.setError(__('errors.NOTEBOOK_NAME_INVALID'));
    return null;
  }
  cancel(e) {
    this.props.cancel(e);
  }
  confirm(e) {
    const notebookData = this.getNotebookData();
    this.props.confirm(notebookData, e);
  }
  render() {
    return (
      <div className={styles.editor}>
        <label className='frow f-ai-fs f-jc-sb t--md p-t--md'>
          <span className={styles.nameLabel}>{__('app.notebooks.phrases.notebookName')}</span>
          <PaperInput
            type='text'
            ref={NAME_REF}
            className={styles.nameInput}
            placeholder={__('app.notebooks.phrases.notebookName')}
            withUnderline={false}
            validator={this.validateNotebookName}
          />
        </label>
        <div className={styles.footer}>
          <button className={styles.cancel} onClick={this.cancel}>{__('terms.cancel')}</button>
          <button className={styles.confirm} onClick={this.confirm}>{__('terms.confirm')}</button>
        </div>
      </div>
    );
  }
}

export default NotebookEditor;
