import React, { Component } from 'react';
import ABCtrl from '../index';

class Dropdown extends Component {
  render() {
    return <ABCtrl triggerType='click' {...this.props} variant='dropdown' />;
  }
}

Dropdown.Trigger = ABCtrl.Trigger;
Dropdown.Content = ABCtrl.Content;

export default Dropdown;
