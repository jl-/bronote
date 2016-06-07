import React, { Component } from 'react';
import cx from 'classnames';

class TabCtrl extends Component {
  render() {
    const { active, children, ...props } = this.props;
    props.className = cx({
      'flat-tabs__ctrl--active': active
    }, props.className, 'flat-tabs__ctrl');
    return (
      <li {...props}>
        {children}
      </li>
    );
  }
}

export default TabCtrl;
