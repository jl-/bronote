import React, { Component, Children, cloneElement } from 'react';
import cx from 'classnames';

class TabContents extends Component {
  renderContentList(nextIndex, children) {
    return Children.map(children, (child, index) => {
      return cloneElement(child, {
        ...child.props,
        active: index === nextIndex
      });
    });
  }
  render() {
    const { currentIndex, children, ...props } = this.props;
    props.className = cx(props.className, 'flat-tabs__contents');
    return (
      <div {...props}>
        {this.renderContentList(currentIndex, children)}
      </div>
    );
  }
}

export default TabContents;
