import ReactDOM from 'react-dom';
import React, { Component, Children } from 'react';
import ReactTransitionGroup from 'react-addons-transition-group';
import cx from 'classnames';
import Toast from './toast';
import uid from '../../../utils/lib/uid';
import './style.scss';

const DEFAULT_TIMEOUT = 0;
const KEY_PREFIX = 'toasty_toast';

class Toasty extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { toasts: []};
    this.add = ::this.add;
    this.remove = ::this.remove;
  }
  add({ ...toast } = {}) {
    const key = toast.key = toast.key || uid(KEY_PREFIX);
    const toasts = this.state.toasts;
    if (!toasts.some(item => item.key === key)) {
      this.setState({ toasts: toasts.concat(toast) });
    }
    return key;
  }
  remove(key) {
    const toasts = this.state.toasts.filter(toast => toast.key !== key);
    this.setState({ toasts });
  }
  render() {
    const { enterTimeout = DEFAULT_TIMEOUT, leaveTimeout = enterTimeout, ...props } = this.props;
    const { toasts } = this.state;
    const toastsList = (Array.isArray(toasts) ? toasts : [toasts]).map((toast, index) => {
      return (
        <Toast
          key={toast.key}
          toast={toast}
          removeFunc={this.remove}
          enterTimeout={enterTimeout}
          leaveTimeout={leaveTimeout}
        />
      );
    });
    return (
      <ReactTransitionGroup
        component='ul'
        className='toasty'
        {...props}
        >
        {toastsList}
      </ReactTransitionGroup>
    );
  }
}

Toasty.newInstance = (config) => {
  const { className, duration, ...props } = config || {};
  const root = document.createElement('div');
  root.className = cx(className, 'toasty-root');
  document.body.appendChild(root);
  const toasty = ReactDOM.render(<Toasty {...props} />, root);
  return {
    component: toasty,
    add: toastProps => toasty.add({ duration, ...toastProps }),
    remove: key => toasty.remove(key),
    destroy() {
      ReactDOM.unmountComponentAtNode(root);
      document.body.removeChild(root);
    }
  };
};

export default Toasty;
