/**
 * <PaperSelect
 *   data={[]}
 *   handleChange
 *   renderOption
 *   >
 * */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ABCtrl from '../ab-ctrl';
import cx from 'classnames';
import './style.scss';

const SELECT_REF = Symbol('paper select');
const CONTENT_REF = Symbol('options list');

class PaperSelect extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { selected: props.selected || 0 };
  }
  componentDidMount() {
    this.adjustOptionsListOffset(this.state.selected);
  }
  getSelectedIndex(wrapper, target) {
    while (target.parentElement !== wrapper) target = target.parentElement;
  }
  handleContentClick(e) {
    const target = e.target;
    const wrapper = ReactDOM.findDOMNode(this.refs[CONTENT_REF]);
    if (target === wrapper) return true;
    let optionDom = target;
    while (optionDom.parentElement !== wrapper) optionDom = optionDom.parentElement;
    const selected = Array.prototype.indexOf.call(wrapper.children, optionDom);
    if (selected === -1 || selected === this.state.selected) return true;
    const { handleSelectChange, data } = this.props;
    if (selected !== this.state.selected) {
      this.setState({ selected });
      this.adjustOptionsListOffset(selected);
      if (typeof handleSelectChange === 'function') return handleSelectChange(data[selected], selected);
    }
  }
  adjustOptionsListOffset(selected = this.state.selected) {
    const list = ReactDOM.findDOMNode(this.refs[CONTENT_REF]);
    const dom = list.children[selected];
    const contentOffsetTop = -dom.offsetTop + 'px';
    this.setState({ contentOffsetTop });
  }
  renderOption(option, index, selected) {
  }
  render() {
    const { data, renderOption, triggerType = 'click', ...props } = this.props;
    const { selected, contentOffsetTop } = this.state;
    const renderOptionFunc = typeof renderOption === 'function' ? (option, index, selected) => {
      let item = renderOption(option, index, selected);
      if (item === false) return this.renderOption(option, index, selected);
      if (!item) return null;
      if (item.type !== 'li') item = <li>{item}</li>;
      return React.cloneElement(item, { key: option.key !==undefined ? option.key : option.value !== undefined ? option.value : index, ...item.props, className: cx(item.props.className, 'paper-select__option', { 'paper-select__option--selected': index === selected }) });
    } : ::this.renderOption;
    const caret = <i className='paper-select__caret fa fa-caret-down'></i>;
    let trigger;
    const options = data.map((option, index) => {
      let item = renderOptionFunc(option, index, selected);
      if (index === selected) trigger = React.createElement('div', item.props);
      return item;
    });
    return (
      <ABCtrl {...props} triggerType={triggerType} variant='paper-select'>
        <ABCtrl.Trigger>{trigger}{caret}</ABCtrl.Trigger>
        <ABCtrl.Content component='ul' style={{ top: contentOffsetTop }} ref={CONTENT_REF} handleContentClick={::this.handleContentClick}>{options}</ABCtrl.Content>
      </ABCtrl>
    );
  }
}

export default PaperSelect;
