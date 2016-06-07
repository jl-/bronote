import React, { Component } from 'react';
import cx from 'classnames';

class ReactX extends Component {
  render() {
    const { children, variant, className, component = 'span', ...props } = this.props;
    props.className = cx(className, variant && `${variant}-x`);
    return React.createElement(component, props, children);
  }
}

export default ReactX;
