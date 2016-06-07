/**
 * <Switcher on={true} onChange={(ison) => {}} />
 *
 * this.refs[SWITCHER_REF].value
 */
import React, { Component, cloneElement } from 'react';
import cx from 'classnames';
import './style.scss';

class Switcher extends Component {
  static defaultProps = {
    on: true
  };
  constructor(props, context) {
    super(props, context);
    this.state = { on: props.on };
    this.handleChange = ::this.handleChange;
  }
  val(on) {
    if (on === undefined) return this.state.on;
    this.toggle(!!on);
  }
  handleChange() {
    this.toggle();
  }
  toggle(on = !this.state.on) {
    const { handleChange } = this.props;
    this.setState({ on });
    if (typeof handleChange === 'function') handleChange(on);
  }
  render() {
    const { on: _on, className, handleChange, label, ...props } = this.props;
    const { on } = this.state;
    const labelEl = label ? typeof label === 'string' ?
      <span className='switcher__label'>{label}</span> :
      cloneElement(label, { className: 'switcher__label' }) : null;
    props.className = cx({
      'switcher--on': on,
      'switcher--off': !on
    }, className, 'switcher');
    return (
      <span {...props} onClick={this.handleChange}>
        {labelEl}
        <span className='switcher__inner'></span>
      </span>
    );
  }
}

export default Switcher;
