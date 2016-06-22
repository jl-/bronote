import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import styles from './style.scss';
import makeColor from 'color';

const LIST_REF = Symbol('pages list');
function getPageId(target, root) {
  let pageId;
  while (target !== root) {
    pageId = +target.getAttribute('data-pageId');
    if (pageId) return pageId;
    target = target.parentNode;
  }
}

class NotebookChapterPagesCtrl extends Component {
  constructor(props, context) {
    super(props, context);
    const { pageId } = props.workspace;
    this.state = { pageId };
    this.createPage = ::this.createPage;
    this.setPage = ::this.setPage;
  }
  componentWillReceiveProps({ workspace }) {
    const { chapterId, pageId } = workspace;
    const { prevChapterId, prevPageId } = this.props.workspace;
    if (pageId !== prevPageId || chapterId !== prevChapterId) {
      this.setState({ pageId });
    }
  }
  createPage() {
    const { actions, workspace } = this.props;
    actions.createPage(workspace.notebookId, workspace.chapterId);
  }
  setPage({ target }) {
    const root = ReactDOM.findDOMNode(this.refs[LIST_REF]);
    const pageId = getPageId(target, root);
    if (!pageId) return;
    const { actions } = this.props;
    actions.setPage(pageId);
  }
  renderPages(pages) {
    const { pageId } = this.state;
    const itemList = pages.map(page => {
      return (
        <li
          key={page.id}
          className={pageId === page.id ? styles.itemActive : styles.item}
          data-pageId={page.id}
        >
          {page.name}
        </li>
      );
    });
    return (
      <ul
        ref={LIST_REF}
        className={styles.list}
        onClick={this.setPage}
      >
        {itemList}
      </ul>
    );
  }
  render() {
    const { actions, workspace, sources, ...props } = this.props;
    const pages = workspace.pages.map(id => sources.pages[id]);
    const chapter = sources.chapters[workspace.chapterId];
    props.className = cx(props.className, styles.root);
    if (chapter) {
      const theme = makeColor(chapter.theme);
      props.style = {
        backgroundColor: theme.lighten(0.3).hexString(),
        color: theme.darken(0.8).hexString()
      };
    }
    return (
      <div {...props}>
        <button
          className={styles.createBtn}
          onClick={this.createPage}
        >
          {__('app.notebooks.phrases.addPage')}
        </button>
        {this.renderPages(pages)}
      </div>
    );
  }
}

export default NotebookChapterPagesCtrl;

