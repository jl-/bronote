import React, { Component } from 'react';
import cx from 'classnames';
import SearchCtrl from './search-ctrl';
import styles from './style.scss';

class GlobalActionBar extends Component {
  constructor(props, context) {
    super(props, context);
    this.createNotebook = ::this.createNotebook;
  }
  createNotebook() {
    this.props.actions.openNotebookEditor();
  }
  render() {
    const { actions, ...props } = this.props;
    props.className = cx(props.className, styles.root);
    return (
      <div {...props}>
        <button className={styles.createNotebookBtn} onClick={this.createNotebook}>
          <i className='icon icon-plus' />
          {__('app.notebooks.phrases.createNotebook')}
        </button>
        <SearchCtrl />
      </div>
    );
  }
}

export default GlobalActionBar;
