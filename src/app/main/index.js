import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import cx from 'classnames';
import NotebookEditor from 'partials/notebook-editor';
import NotebooksSelector from 'partials/notebooks-selector';
import NotebookChaptersCtrl from './chapters-ctrl';
import NotebookPageEditor from './page-editor';
import NotebookChapterPagesCtrl from './pages-ctrl';
import styles from './style.scss';
import {
  openNotebookEditor,
  closeNotebookEditor,
  submitNotebook,
  fetchNotebooks,
} from 'modules/notebooks/action-creators/notebooks';

class Main extends Component {
  constructor(props, context) {
    super(props, context);
    this.closeNotebookEditor = ::this.closeNotebookEditor;
    this.submitNotebook = ::this.submitNotebook;
  }
  componentDidMount() {
    this.props.actions.fetchNotebooks();
  }
  closeNotebookEditor() {
    this.props.actions.closeNotebookEditor();
  }
  submitNotebook(notebook) {
    if (!notebook) return;
    this.closeNotebookEditor();
    this.props.actions.submitNotebook(notebook);
  }
  renderBlank() {
    return (
      <div className={styles.main}>
      </div>
    );
  }
  render() {
    const { actions, app, notebooks, notebook, workspace, sources } = this.props;
    return (
      <div className={styles.main}>
        <div className={styles.mainCtrl}>
          <NotebooksSelector
            actions={actions}
            notebook={notebook}
            notebooks={notebooks.all}
            sources={sources}
            workspace={workspace}
            className={styles.notebooksSelector}
          />
          <NotebookChaptersCtrl
            className={styles.chaptersCtrl}
            actions={actions}
            notebook={notebook}
            sources={sources}
            workspace={workspace}
          />
        </div>
        <div className={styles.workspace}>
          <NotebookPageEditor
            className={styles.pageEditor}
            notebook={notebook}
            sources={sources}
            workspace={workspace}
          />
          <NotebookChapterPagesCtrl
            className={styles.pagesCtrl}
            notebook={notebook}
            sources={sources}
            workspace={workspace}
          />
        </div>
        <NotebookEditor
          notebook={notebooks.editing}
          hidden={!app.notebookEditorShown}
          confirm={this.submitNotebook}
          cancel={this.closeNotebookEditor}
        />
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const { app, notebooks, notebook, workspace, sources } = state;
  return { app, notebooks, notebook, workspace, sources };
}

function mapDispatchToProps(dispatch, props) {
  const actions = bindActionCreators({
    openNotebookEditor,
    closeNotebookEditor,
    submitNotebook,
    fetchNotebooks,
  }, dispatch);

  return { actions };
}

export const ReduxMain = connect(mapStateToProps, mapDispatchToProps)(Main);

export default ReduxMain;
