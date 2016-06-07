import React, { Component } from 'react';
import cx from 'classnames';

class TabContent extends Component {
  render() {
    const { active, children, ...props } = this.props;
    props.className = cx({
      'flat-tabs__content--active': active
    }, props.className, 'flat-tabs__content');
    return (
      <div {...props}>
        {children}
      </div>
    );
  }
}

export default TabContent;
