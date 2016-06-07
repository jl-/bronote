import React from 'react';
import cx from 'classnames';
import PaperFormControl from '../form-control';
import STATUS from '../status';
import './style.scss';

const MIN_ROWS = 1;
const MAX_ROWS = 10;
const FIELD_REF = Symbol('field');

class PaperInput extends PaperFormControl {
  constructor(props, context) {
    super(props, context, 'textarea');
  }
  getValue(onlyIfValid = false) {
    const value = this.refs[FIELD_REF].value;
    return !onlyIfValid || (this.state.status & STATUS.VALID) ? value : undefined;
  }
  calcRows(value) {
    const { minRows = MIN_ROWS, maxRows = MAX_ROWS } = this.props;
    if (typeof value !== 'string') return minRows;
    const rows = value.split('\n').length;
    return rows < minRows ? minRows : rows > maxRows ? maxRows : rows;
  }
  handleChange() {
    const rows = this.calcRows(this.getValue());
    if (rows !== this.state.rows) this.setState({ rows });
    super.handleChange();
  }
  focus(e) {
    const field = this.refs[FIELD_REF];
    field.focus();
    if (e) e.preventDefault();
  }
  render() {
    const { label, hint, placeholder, className, validator, trigger, ...props } = this.props;
    const { status, rows = this.calcRows(props.defaultValue), error } = this.state;
    const labelEl = label ? <label className='paper-textarea-label'>{label}</label> : null;

    return (
      <div className={cx(this.statusify(), { 'paper-textarea--with-label': !!labelEl })}>
        {labelEl}
        <textarea
          rows={rows}
          {...props}
          ref={FIELD_REF}
          className={cx(className, 'paper-textarea-field')}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
        >
        </textarea>
        <span className={cx('paper-textarea-underline')}></span>
        {hint || validator ? <span className='paper-textarea-info'>{error || hint}</span> : null}
      </div>
    );
  }
}

export default PaperInput;
