/**
 * <ABCtrl.Trigger component='div'>
 * </ABCtrl.Trigger>
 *
 *
 * */
import React, { Component } from 'react';
import cx from 'classnames';

class ABCtrlTrigger extends Component {
  render() {
    const { component = 'div', children, ...props } = this.props;
    return React.createElement(component, props, children);
  }
}

export default ABCtrlTrigger;
