/**
 * import PaperInput from 'pathtocomponents/paper-form/input';
 * <PaperInput type='text' placeholder='' validator={() => {}}>
 *
 */
import React from 'react';
import cx from 'classnames';
import PaperFormControl from '../form-control';
import STATUS from '../status';
import './style.scss';
import uid from '../../../../utils/lib/uid';

const FIELD_REF = Symbol('field');

class PaperInput extends PaperFormControl {
  constructor(props, context) {
    super(props, context, 'input');
  }
  // callback to trigger a validation
  getValue(callback = null) {
    if (typeof callback !== 'function') return this.refs[FIELD_REF].value;
    this.validate(callback);
  }
  setValue(value) {
    const field = this.refs[FIELD_REF];
    field.value = value;
    return this;
  }
  handleFocus(e) {
    super.handleFocus(e);
    this.focus();
  }
  focus(e) {
    const field = this.refs[FIELD_REF];
    field.focus();
    if (e) e.preventDefault();
  }
  render() {
    const { type, label, hint, placeholder, withUnderline = true, className, validator, trigger, prefix, suffix, ...props } = this.props;
    const { status, error } = this.state;
    const labelEl = label ? <label className='paper-input-label'>{label}</label> : null;
    const hintEl = hint || error ? <span className='paper-input-info'>{error || hint}</span> : null;
    const underlineEl = withUnderline && <span className='paper-input-underline'></span>;
    const rich = !!(prefix || suffix);
    const border = rich ? <span className='paper-input-border'></span> : null;
    if (!labelEl) props.placeholder = placeholder;
    const input = (
      <input
        {...props}
        type={type}
        ref={FIELD_REF}
        className={cx(className, 'paper-input-field')}
        onChange={this.handleChange}
      />
    );
    return (
      <div
        tabIndex={uid()}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
        className={cx({
          'frow f-ai-c paper-input--rich': rich,
          'paper-input--with-label': !!labelEl,
          'paper-input--with-info': !!hintEl
        }, this.statusify(!label))}
      >
        {prefix}
        {labelEl}
        {input}
        {suffix}
        {border}
        {underlineEl}
        {hintEl}
      </div>
    );
  }
}

export default PaperInput;
