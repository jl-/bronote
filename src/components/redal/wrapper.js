import React, { Component, Children, createElement, cloneElement } from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import domContains from 'utils/lib/domContains';

const STATUS_WILL_APPEAR = 1;
const STATUS_DID_APPEAR = 2;
const STATUS_WILL_ENTER = 3;
const STATUS_DID_ENTER = 4;
const STATUS_WILL_LEAVE = 5;
const STATUS_DID_LEAVE = 6;

const INNER_REF = Symbol('inner');

class RedalWrapper extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { status: STATUS_WILL_ENTER };
    this.handleClick = ::this.handleClick;
  }
  componentWillAppear(cb) {
    const { willAppear, appearTimeout = 0 } = this.props;
    this.setState({ status: STATUS_WILL_APPEAR });
    setTimeout(cb, appearTimeout);
    typeof willAppear === 'function' && setTimeout(() => willAppear(this.refs.inner), 0);
  }
  componentDidAppear() {
    const { didAppear } = this.props;
    this.setState({ status: STATUS_DID_APPEAR });
    typeof didAppear === 'function' && setTimeout(() => didAppear(this.refs.inner), 0);
  }
  componentWillEnter(cb) {
    const { willEnter, enterTimeout = 0 } = this.props;
    this.setState({ status: STATUS_WILL_ENTER });
    setTimeout(cb, enterTimeout);
    typeof willEnter === 'function' && setTimeout(() => willEnter(this.refs.inner), 0);
  }
  componentDidEnter() {
    const { didEnter } = this.props;
    this.setState({ status: STATUS_DID_ENTER });
    typeof didEnter === 'function' && setTimeout(() => didEnter(this.refs.inner), 0);
  }
  componentWillLeave(cb) {
    const { willLeave, leaveTimeout = 0 } = this.props;
    this.setState({ status: STATUS_WILL_LEAVE });
    setTimeout(cb, leaveTimeout);
    typeof willLeave === 'function' && setTimeout(() => willLeave(this.refs.inner), 0);
  }
  componentDidLeave() {
    const { didLeave } = this.props;
    this.setState({ status: STATUS_DID_LEAVE });
    typeof didLeave === 'function' && setTimeout(() => didLeave(this.refs.inner), 0);
  }
  handleClick(e) {
    const { maskToggle = true, handleMaskClick, close } = this.props;
    const inner = ReactDOM.findDOMNode(this.refs[INNER_REF]);
    const willLeave = typeof handleMaskClick === 'function' ? handleMaskClick(e, inner) : maskToggle && inner !== e.target && !domContains(inner, e.target);
    if (willLeave) close();
  }
  render() {
    const { className, variant, children, ...props } = this.props;
    const { status } = this.state;
    const cn = cx({
      [`${variant}--appearing`]: status === STATUS_WILL_APPEAR,
      [`${variant}--appeared`]: status === STATUS_DID_APPEAR,
      [`${variant}--entering`]: status === STATUS_WILL_ENTER,
      [`${variant}--entered`]: status === STATUS_DID_ENTER,
      [`${variant}--leaving`]: status === STATUS_WILL_LEAVE,
      [`${variant}--left`]: status === STATUS_DID_LEAVE
    }, variant, className);
    const child = Children.count(children) === 1 ? children[0] : null;
    const inner = child ?
      cloneElement(child, { className: cx(child.props.className, `${variant}-inner`), ref: INNER_REF }) :
      createElement('div', { className: cx(className, `${variant}-inner`), ref: INNER_REF }, children);
    return (
      <div className={cn} {...props} onClick={this.handleClick}>
        {inner}
      </div>
    );
  }
}

export default RedalWrapper;
