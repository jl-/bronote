import React, { Component } from 'react';
import cx from 'classnames';
import styles from './style.scss';

class NotebookChapterPagesCtrl extends Component {
  constructor(props, context) {
    super(props, context);
    this.addPage = ::this.addPage;
  }
  addPage() {
  }
  renderPages(pages) {
    const itemList = pages.map(page => {
      return (
        <li
          key={page.id}
          className={styles.item}
        >
          {page.name}
        </li>
      );
    });
    return <ul className={styles.list}>{itemList}</ul>;
  }
  render() {
    const { actions, workspace, sources, ...props } = this.props;
    const pages = workspace.pages.map(id => sources.pages[id]);
    props.className = cx(props.className, styles.root);
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

