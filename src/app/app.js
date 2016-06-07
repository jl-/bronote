import React, { Component, cloneElement } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import cx from 'classnames';
import styles from './app.scss';
import Tooltip from 'components/ab-ctrl/tooltip/singleton';
import GlobalActionBar from './action-bar';

import {
  pickFolder,
} from 'modules/folders/action-creators/folder';

class App extends Component {
  render() {
    const { children, actions } = this.props;
    const content = children ? cloneElement(children, { actions }) : children;
    return (
      <div className={styles.app}>
        <GlobalActionBar />
        {content}
        <Tooltip />
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return state;
}
function mapDispatchToProps(dispatch, props) {
  const actions = bindActionCreators({
    pickFolder,
  }, dispatch);

  return { actions };
}

export const ReduxApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default ReduxApp;
