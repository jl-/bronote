import React, { Component, Children } from 'react';

const THRESHOLD = 200;

class BmapSearchInput extends Component {
  val(newValue) {
    if (newValue === undefined) return this.refs[this.props.id].value;
    this.refs[this.props.id].value = newValue;
    return this;
  }
  onChange() {
    const { handleChange, threshold = THRESHOLD } = this.props;
    if (!handleChange) return;
    clearTimeout(this._timer);
    this._timer = setTimeout(() => handleChange(this.val()), THRESHOLD);
  }
  onFocus() {
    const { handleFocus } = this.props;
    handleFocus && handleFocus();
  }
  onBlur() {
    const { handleBlur } = this.props;
    handleBlur && handleBlur(this.val());
  }
  render() {
    const { type, id, handleChange, handleFocus, handleBlur, ...props } = this.props;
    return (
      <input {...props} ref={id} id={id} type='text' onChange={handleChange ? ::this.onChange : null} onFocus={handleFocus ? ::this.onFocus : null} onBlur={handleBlur ? ::this.onBlur : null} />
    );
  }
}

export default BmapSearchInput;
