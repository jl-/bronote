import React, { Component } from 'react';
import cx from 'classnames';

class ABCtrlContent extends Component {
  render() {
    const { component = 'div', align, children, ...props } = this.props;
    return React.createElement(component, props, children);
  }
}

export default ABCtrlContent;
