import React, { Component } from 'react';
import cx from 'classnames';
import RootCtrl from './root-ctrl';
import Workspace from './workspace';
import styles from './style.scss';

class Main extends Component {
  render() {
    const { actions } = this.props;
    return (
      <div className={styles.main}>
        <RootCtrl className={styles.rootCtrl} actions={actions} />
        <Workspace className={styles.workspace} actions={actions} />
      </div>
    );
  }
}

export default Main;

