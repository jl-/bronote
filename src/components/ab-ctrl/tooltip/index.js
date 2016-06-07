import React, { Component } from 'react';
import ABCtrl from '../index';

class Tooltip extends Component {
  render() {
    return <ABCtrl triggerType='hover' interactive={false} {...this.props} variant='tooltip' />;
  }
}

Tooltip.Trigger = ABCtrl.Trigger;
Tooltip.Content = ABCtrl.Content;

export default Tooltip;

