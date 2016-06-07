import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import TOAST_TYPES from './types';

const STATUS_WILL_ENTER = 1;
const STATUS_DID_ENTER = 2;
const STATUS_WILL_LEAVE = 3;
const STATUS_DID_LEAVE = 4;

// { type, content, duration, willEnter, willLeave, didEnter, didLeave }
class Toast extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { status: STATUS_WILL_ENTER };
  }
  componentWillEnter(cb) {
    const { toast, enterTimeout } = this.props;
    this.setState({ status: STATUS_WILL_ENTER });
    setTimeout(cb, enterTimeout);
    typeof toast.willEnter === 'function' && toast.willEnter(toast);
  }
  componentDidEnter() {
    const { toast, enterTimeout, leaveTimeout, removeFunc } = this.props;
    const { key, duration, didEnter } = toast;
    const removeAfterMS = duration > 0 ? duration - enterTimeout - leaveTimeout : undefined;
    this.setState({ status: STATUS_DID_ENTER });
    typeof didEnter === 'function' && setTimeout(() => didEnter(toast), 0);
    if (removeAfterMS !== undefined) setTimeout(() => removeFunc(key), removeAfterMS > 0 ? removeAfterMS : 0);
  }
  componentWillLeave(cb) {
    const { toast, leaveTimeout } = this.props;
    this.setState({ status: STATUS_WILL_LEAVE });
    setTimeout(cb, leaveTimeout);
    typeof toast.willLeave === 'function' && toast.willLeave(toast);
  }
  componentDidLeave() {
    const { toast } = this.props;
    this.setState({ status: STATUS_DID_LEAVE });
    typeof toast.didLeave === 'function' && setTimeout(() => toast.didLeave(toast), 0);
  }
  render() {
    const { toast } = this.props;
    const { status } = this.state;
    const cn = cx({
      'toasty-toast--info': toast.type === TOAST_TYPES.INFO || toast.type === undefined,
      'toasty-toast--warning': toast.type === TOAST_TYPES.WARNING,
      'toasty-toast--error': toast.type === TOAST_TYPES.ERROR,
      'toasty-toast--entering': status === STATUS_WILL_ENTER,
      'toasty-toast--entered': status === STATUS_DID_ENTER,
      'toasty-toast--leaving': status === STATUS_WILL_LEAVE,
      'toasty-toast--left': status === STATUS_DID_LEAVE
    }, 'toasty-toast');
    return <li className={cn}>{toast.content}</li>;
  }
}

export default Toast;
