import React, { Component } from 'react';
import cx from 'classnames';
import STATUS from './status';
import './style.scss';

const VALIDATE_TIMEOUT = 300;

class PaperFormControl extends Component {
  constructor(props, context, type = 'input') {
    super(props, context);
    const { error, defaultValue } = props;
    this.state = { error, status: error ? STATUS.INVALID : defaultValue ? STATUS.VALID :  STATUS.PRISTINE };
    this.type = type;
    this.handleFocus = ::this.handleFocus;
    this.handleBlur = ::this.handleBlur;
    this.handleChange = ::this.handleChange;
  }
  handleFocus(){
    let status = this.state.status;
    if (this.getValue().length === 0 && status & STATUS.PRISTINE) {
      status = status & ~STATUS.PRISTINE | STATUS.BLANK;
    }
    this.setState({ status: status | STATUS.FOCUSED });
  }
  handleBlur(){
    let status = this.state.status & (~STATUS.FOCUSED);
    if (!(status & STATUS.INVALID) && this.getValue().length === 0) status |= STATUS.BLANK;
    this.setState({ status });
    if (this.props.trigger === 'blur') this.validate();
  }
  handleChange() {
    const { trigger = 'change' } = this.props;
    this.update();
    if (trigger === 'change') this.validate();
  }

  // @ needs to be override
  getValue(onlyIfValid = false) {
  }

  setError(error) {
    const status = this.state.status & ~STATUS.PRISTINE & ~STATUS.PENDING & (error ? ~STATUS.VALID : ~STATUS.INVALID) | (error ? STATUS.INVALID : STATUS.VALID);
    this.setState({ error, status });
  }
  update() {
    const status = this.state.status | STATUS.DIRTY;
    if (this.getValue().length === 0) {
      if (~status & STATUS.BLANK) {
        this.setState({ status: status | STATUS.BLANK });
      }
    } else if (status & STATUS.BLANK) {
      this.setState({ status: status & (~STATUS.BLANK) });
    }
  }
  // bare: without label
  statusify(bare = false, type = this.type) {
    const { status } = this.state;
    const base = `paper-${type}`;
    return cx({
      [`${base}--pristine`]: status & STATUS.PRISTINE,
      [`${base}--blank`]: status & STATUS.BLANK,
      [`${base}--dirty`]: status & STATUS.DIRTY,
      [`${base}--pending`]: status & STATUS.PENDING,
      [`${base}--valid`]: status & STATUS.VALID,
      [`${base}--invalid`]: status & STATUS.INVALID,
      [`${base}--focused`]: status & STATUS.FOCUSED,

      [`${base}--bare`]: bare
    }, base);
  }
  validate(){
    const { validator } = this.props;
    if(typeof validator !== 'function') return;

    clearTimeout(this._timer);
    this._timer = setTimeout(() => {
      let res = validator.call(this, this.getValue());
      if (res && typeof res.then === 'function') {
        this.setState({ status: this.state.status | STATUS.PENDING });
        res.then(() => {
          this.setError(null);
        }, error => {
          this.setError(error);
        });
      } else {
        this.setError(res === true ? null : res || ' ');
      }
    }, VALIDATE_TIMEOUT);
  }
  render(){
    return null;
  }
}

export default PaperFormControl;
