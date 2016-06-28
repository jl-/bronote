import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import cx from 'classnames';
import PaperInput from 'components/paper-form/input';
import GlobalActionBar from './action-bar';
import NotebookEditor from 'partials/notebook-editor';
import NotebooksSelector from 'partials/notebooks-selector';
import NotebookChaptersCtrl from './chapters-ctrl';
import NotebookPageContentEditor from './page-content-editor';
import NotebookChapterPagesCtrl from './pages-ctrl';
import NotebookPageTitleEditor from './page-title-editor';
import styles from './style.scss';
import {
  openNotebookEditor,
  closeNotebookEditor,
  submitNotebook,
  fetchNotebooks,
  createChapter,
  createPage,
  setNotebook,
  setChapter,
  setPage,
  updateNotebook,
  updateChapter,
  updatePage,
  deletePage,
} from 'modules/notebooks/action-creators/notebooks';
import {
  initMain
} from 'modules/app/action-creators/main';

const PAGE_CONTENT_EDITOR_REF = Symbol('page content editor');
const PAGE_TITLE_EDITOR_REF = Symbol('page title editor');

class Main extends Component {
  constructor(props, context) {
    super(props, context);
    this.closeNotebookEditor = ::this.closeNotebookEditor;
    this.submitNotebook = ::this.submitNotebook;
    this.savePage = ::this.savePage;
    this.setPageTitle = ::this.setPageTitle;
  }
  componentDidMount() {
    this.props.actions.initMain();
  }
  componentWillReceiveProps({ workspace, sources }) {
  }
  closeNotebookEditor() {
    this.props.actions.closeNotebookEditor();
  }
  savePage() {
    const { actions, sources, workspace } = this.props;
    const page = sources.pages[workspace.pageId];
    if (!page || typeof page !== 'object') return;
    const content = this.refs[PAGE_CONTENT_EDITOR_REF].getContent();
    const name = this.refs[PAGE_TITLE_EDITOR_REF].getInput().getValue();
    return actions.updatePage({ ...page, name, content });
  }
  setPageTitle(title) {
    if (title.length < 2) {
      return __('errors.PAGE_TITLE_INVALID');
    }
    const { actions, workspace } = this.props;
    return actions.updatePage({
      id: workspace.pageId,
      name: title
    });
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
    const { actions, app, notebooks, workspace, sources } = this.props;
    const notebook = sources.notebooks[workspace.notebookId];
    const chapter = sources.chapters[workspace.chapterId];
    const page = sources.pages[workspace.pageId];
    const rootCtrlEl = notebook && (
      <div
        className={styles.rootCtrl}
        style={{
          boxShadow: `inset 0 -4px ${chapter && chapter.theme}`
        }}
      >
        <NotebooksSelector
          actions={actions}
          handleChange={this.savePage}
          notebooks={notebooks.all}
          sources={sources}
          workspace={workspace}
          className={styles.notebooksSelector}
        />
        <NotebookChaptersCtrl
          className={styles.chaptersCtrl}
          actions={actions}
          handleChange={this.savePage}
          sources={sources}
          workspace={workspace}
        />
      </div>
    );
    const pageEditor = page && (
      <div className={styles.pageEditor}>
        <NotebookPageTitleEditor
          ref={PAGE_TITLE_EDITOR_REF}
          page={page}
          className={styles.titleInput}
          validator={this.setPageTitle}
          style={{
            color: chapter && chapter.theme
          }}
        />
        <NotebookPageContentEditor
          ref={PAGE_CONTENT_EDITOR_REF}
          className={styles.pageContentEditor}
          handleChange={this.savePage}
          page={page}
        />
      </div>
    );
    const workspaceEl = notebook && (
      <div className={styles.workspace}>
        {pageEditor}
        <NotebookChapterPagesCtrl
          className={styles.pagesCtrl}
          actions={actions}
          handleChange={this.savePage}
          sources={sources}
          workspace={workspace}
        />
      </div>
    );
    return (
      <div className={styles.main}>
        <GlobalActionBar actions={actions} />
        {rootCtrlEl}
        {workspaceEl}
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
  const { app, notebooks, workspace, sources } = state;
  return { app, notebooks, workspace, sources };
}

function mapDispatchToProps(dispatch, props) {
  const actions = bindActionCreators({
    openNotebookEditor,
    closeNotebookEditor,
    submitNotebook,
    fetchNotebooks,
    createChapter,
    createPage,
    setNotebook,
    setChapter,
    setPage,
    updateNotebook,
    updateChapter,
    updatePage,
    deletePage,
    initMain,
  }, dispatch);

  return { actions };
}

export const ReduxMain = connect(mapStateToProps, mapDispatchToProps)(Main);

export default ReduxMain;
