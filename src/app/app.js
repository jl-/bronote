import React, { Component, cloneElement } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import cx from 'classnames';
import styles from './app.scss';
import Tooltip from 'components/ab-ctrl/tooltip/singleton';
import {
  openNotebookEditor,
} from 'modules/notebooks/action-creators/notebooks';

class App extends Component {
  render() {
    const { children, actions } = this.props;
    const content = children ? cloneElement(children, { actions }) : children;
    return (
      <div className={styles.app}>
        {content}
        <Tooltip />
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const { app } = state;
  return { app };
}
function mapDispatchToProps(dispatch, props) {
  const actions = bindActionCreators({
    openNotebookEditor,
  }, dispatch);

  return { actions };
}

export const ReduxApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default ReduxApp;
