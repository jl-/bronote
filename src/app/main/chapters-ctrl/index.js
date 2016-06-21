import React, { Component } from 'react';
import cx from 'classnames';
import styles from './style.scss';
import ChapterContextMenu from 'partials/chapter-contextmenu';

class NotebookChaptersCtrl extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { contextMenuHidden: true };
    this.openContextMenu = ::this.openContextMenu;
    this.closeContextMenu = ::this.closeContextMenu;
    this.createChapter = ::this.createChapter;
  }
  createChapter() {
    const { actions, workspace } = this.props;
    actions.createChapter(workspace.notebookId);
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
  renderChapters(chapters) {
    const itemList = chapters.map(chapter => {
      return (
        <li
          key={chapter.id}
          className={styles.item}
          style={{
            backgroundColor: chapter.theme
          }}
        >
          {chapter.name}
        </li>
      );
    });
    return <ul className={styles.list} onContextMenu={this.openContextMenu}>{itemList}</ul>;
  }
  render() {
    const { actions, workspace, sources, ...props } = this.props;
    const notebook = this.composeNotebookData(workspace, sources);
    props.className = cx(props.className, styles.root);
    return (
      <div {...props}>
        {this.renderChapters(notebook.chapters)}
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

