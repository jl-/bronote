import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import styles from './style.scss';
import makeColor from 'color';
import PageContextMenu from 'partials/page-contextmenu';

const LIST_REF = Symbol('pages list');
function getPageId(target, root) {
  let pageId;
  while (target && target !== root) {
    pageId = +target.getAttribute('data-pageId');
    if (pageId) return pageId;
    target = target.parentElement;
  }
}

class NotebookChapterPagesCtrl extends Component {
  constructor(props, context) {
    super(props, context);
    const { pageId } = props.workspace;
    this.state = { pageId, contextMenuStyle: null };
    this.createPage = ::this.createPage;
    this.setPage = ::this.setPage;
    this.openContextMenu = ::this.openContextMenu;
    this.closeContextMenu = ::this.closeContextMenu;
    this.deletePage = ::this.deletePage;
  }
  componentWillReceiveProps({ workspace }) {
    const { chapterId, pageId } = workspace;
    const { prevChapterId, prevPageId } = this.props.workspace;
    if (pageId !== prevPageId || chapterId !== prevChapterId) {
      this.setState({ pageId });
    }
  }
  deletePage(e) {
    const { contextMenuPageId } = this.state;
    if (!contextMenuPageId) return;
    const { actions } = this.props;
    actions.deletePage(contextMenuPageId);
    this.closeContextMenu();
  }
  openContextMenu(e) {
    const root = ReactDOM.findDOMNode(this.refs[LIST_REF]);
    const pageId = getPageId(e.target, root);
    if (!pageId) return;
    this.closeContextMenu();
    const contextMenuStyle = {
      left: e.pageX,
      top: e.pageY
    };
    this.setState({ contextMenuStyle, contextMenuPageId: pageId });
  }
  closeContextMenu() {
    this.setState({ contextMenuStyle: null, contextMenuPageId: null });
  }
  createPage() {
    const { actions, workspace } = this.props;
    actions.createPage(workspace.notebookId, workspace.chapterId);
  }
  setPage({ target }) {
    const root = ReactDOM.findDOMNode(this.refs[LIST_REF]);
    const pageId = getPageId(target, root);
    if (!pageId || pageId === this.state.pageId) return;
    const { actions } = this.props;
    this.props.handleChange();
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
        onContextMenu={this.openContextMenu}
      >
        {itemList}
      </ul>
    );
  }
  render() {
    const { actions, workspace, sources, ...props } = this.props;
    const pages = workspace.pages.map(id => sources.pages[id]);
    const chapter = sources.chapters[workspace.chapterId];
    const { contextMenuStyle } = this.state;
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
        <PageContextMenu
          hidden={!contextMenuStyle}
          handleMaskClick={this.closeContextMenu}
          onContextMenu={this.closeContextMenu}
          handleDelete={this.deletePage}
          style={contextMenuStyle}
        />
      </div>
    );
  }
}

export default NotebookChapterPagesCtrl;

