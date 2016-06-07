import React, { Component } from 'react';
import cx from 'classnames';
// import WinCtrl from './win-ctrl';
import SearchCtrl from './search-ctrl';
import CreateNoteBtn from './create-note';
import styles from './style.scss';

class GlobalActionBar extends Component {
  render() {
    const { ...props } = this.props;
    props.className = cx(props.className, styles.root);
    return (
      <div {...props}>
        <CreateNoteBtn className='m-r--sm' />
        <SearchCtrl />
      </div>
    );
  }
}

export default GlobalActionBar;
