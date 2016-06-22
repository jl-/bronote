import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import styles from './style.scss';
import ChapterContextMenu from 'partials/chapter-contextmenu';
import makeColor from 'color';

const LIST_REF = Symbol('chapters list');

function getChapterId(target, wrapper) {
  let chapterId;
  while (target !== wrapper) {
    chapterId = target.getAttribute('data-chapterId');
    if (chapterId) {
      break;
    } else {
      target = target.parentNode;
    }
  }
  return +chapterId;
}

class NotebookChaptersCtrl extends Component {
  constructor(props, context) {
    super(props, context);
    const { chapterId } = props.workspace;
    this.state = { contextMenuHidden: true, chapterId };
    this.openContextMenu = ::this.openContextMenu;
    this.closeContextMenu = ::this.closeContextMenu;
    this.createChapter = ::this.createChapter;
    this.setChapter = ::this.setChapter;
    this.editChapter = ::this.editChapter;
    this.submitChapterEdit = ::this.submitChapterEdit;
    this.handleEditHitEnter = ::this.handleEditHitEnter;
  }
  componentWillReceiveProps({ workspace }) {
    const { notebookId, chapterId } = workspace;
    const { prevNotebookId, prevChapterId } = this.props.workspace;
    if (chapterId !== prevChapterId || notebookId !== prevNotebookId) {
      this.setState({ chapterId });
    }
  }
  createChapter() {
    const { actions, workspace } = this.props;
    actions.createChapter(workspace.notebookId);
  }
  handleEditHitEnter(e) {
    if (e.keyCode !== 13) return;
    console.log('bla');
    e.preventDefault();
    this.submitChapterEdit();
  }
  setChapter({ target }) {
    const wrapper = ReactDOM.findDOMNode(this.refs[LIST_REF]);
    const chapterId = getChapterId(target, wrapper);
    if (chapterId && chapterId !== this.state.chapterId) {
      this.setState({ chapterId });
      this.props.actions.setChapter(chapterId);
    }
  }
  editChapter({ target }) {
    const wrapper = ReactDOM.findDOMNode(this.refs[LIST_REF]);
    const chapterId = getChapterId(target, wrapper);
    if (chapterId) {
      this.setState({ chapterId, editing: true });
      setTimeout(() => {
        const range = document.createRange();
        const selection = window.getSelection();
        range.selectNodeContents(target);
        selection.removeAllRanges();
        selection.addRange(range);
        target.focus();
      }, 0);
    }
  }
  submitChapterEdit() {
    this.setState({ editing: false });
  }
  openContextMenu(e) {
    const contextMenuStyle = {
      left: e.pageX,
      top: e.pageY
    };
    this.setState({ contextMenuHidden: false, contextMenuStyle });
  }
  closeContextMenu() {
    this.setState({ contextMenuHidden: true, contextMenuStyle: null });
  }
  composeNotebookData(workspace, sources) {
    const chapters = workspace.chapters.map(id => sources.chapters[id]);
    return { chapters };
  }
  renderChapters(chapters, current) {
    const { chapterId, editing } = this.state;
    const itemList = chapters.map(chapter => {
      const theme = makeColor(chapter.theme);
      const backgroundColor = chapter.id === current ? theme.hexString() : theme.lighten(0.2).hexString();
      const color = theme.darken(0.8).hexString();
      const isEditing = chapterId === chapter.id && editing;
      return (
        <li
          key={chapter.id}
          className={styles.item}
          style={{ backgroundColor, color }}
          data-chapterId={chapter.id}
          contentEditable={isEditing ? true : undefined}
          tabIndex={isEditing ? '-1' : undefined}
          onBlur={isEditing && this.submitChapterEdit}
          onKeyDown={isEditing && this.handleEditHitEnter}
        >
          {chapter.name}
        </li>
      );
    });
    return (
      <ul
        ref={LIST_REF}
        className={styles.list}
        onContextMenu={this.openContextMenu}
        onClick={this.setChapter}
        onDoubleClick={this.editChapter}
      >
        {itemList}
      </ul>
    );
  }
  render() {
    const { actions, workspace, sources, ...props } = this.props;
    const notebook = this.composeNotebookData(workspace, sources);
    props.className = cx(props.className, styles.root);
    return (
      <div {...props}>
        {this.renderChapters(notebook.chapters, this.state.chapterId)}
        <span className={styles.createBtn} onClick={this.createChapter} />
        <ChapterContextMenu
          hidden={this.state.contextMenuHidden}
          handleMaskClick={this.closeContextMenu}
          style={this.state.contextMenuStyle}
        />
      </div>
    );
  }
}

export default NotebookChaptersCtrl;

