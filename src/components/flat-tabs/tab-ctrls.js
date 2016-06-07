import React, { Component, Children, cloneElement } from 'react';
import cx from 'classnames';

class TabCtrls extends Component {
  renderCtrlList(nextIndex, children) {
    return Children.map(children, (child, index) => {
      return cloneElement(child, {
        ...child.props,
        active: index === nextIndex
      });
    });
  }
  render() {
    const { currentIndex, children, ...props } = this.props;
    props.className = cx(props.className, 'flat-tabs__ctrls');
    return (
      <ul {...props}>
        {this.renderCtrlList(currentIndex, children)}
      </ul>
    );
  }
}

export default TabCtrls;
