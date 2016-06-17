import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  fetchNotebooks,
} from 'modules/notebooks/action-creators/notebooks';

class Main extends Component {
  constructor(props, context) {
    super(props, context);
  }
  componentDidMount() {
    this.props.actions.fetchNotebooks();
  }
  render() {
    return null;
  }
}

function mapStateToProps(state, props) {
  return state;
}

function mapDispatchToProps(dispatch, props) {
  const actions = bindActionCreators({
    fetchNotebooks
  }, dispatch);

  return { actions };
}

export const ReduxMain = connect(mapStateToProps, mapDispatchToProps)(Main);

export default ReduxMain;
