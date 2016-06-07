import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import './style.scss';

class Toast extends Component {
  render() {
    const { isOn, onToggle, children } = this.props;
    return (
      <div>
        {children}
      </div>
    );
  }
}

export default Toast;
