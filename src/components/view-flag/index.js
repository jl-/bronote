/**
 * disabled
 * once: false; true to trigger `handleAppear` on appeared & scrolling
 * handleAppear(currentStatus, previousStatus, flagDOM)
 *
 * @TODO add offset support
 *
 */
import React, { Component } from 'react';
import cx from 'classnames';
import { throttle } from '../../../utils';
import './style.scss';

const THROTTLE_MS = 100;
const FLAG_REF = Symbol('flag');

const STATUS = {
  INIT: 0,
  ABOVE_VIEWPORT: 1,
  WITHIN_VIEWPORT: 2,
  BENEATH_VIEWPORT: 3
};

class ViewFlag extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { status: STATUS.INIT };
  }
  componentDidUpdate(prevProps) {
    const props = this.props;
    const shouldReSubscribe = props.handleAppear !== prevProps.handleAppear || props.disabled !== prevProps.disabled || props.once !== prevProps.once;
    if (!shouldReSubscribe) return;
    if (typeof this.unsubscribe === 'function') this.unsubscribe();
    this.subscribe(props);
  }
  componentDidMount() {
    this.subscribe();
  }
  componentWillUnmount() {
    if (typeof this.unsubscribe === 'function') this.unsubscribe();
  }
  subscribe(props = this.props) {
    const { disabled, handleAppear, throttleMS = THROTTLE_MS } = props;
    if (disabled !== true && typeof handleAppear === 'function' && typeof this.unsubscribe !== 'function') {
      const handler = throttle(this.trigger.bind(this, props), throttleMS);
      document.addEventListener('scroll', handler, true);
      this.unsubscribe = () => {
        document.removeEventListener('scroll', handler, true);
        delete this.unsubscribe;
      };
      this.trigger(props);
    }
  }
  status(props = this.props) {
    const { offsetTop = 0, offsetBottom = 0 } = props;
    const rect = this.refs[FLAG_REF].getBoundingClientRect();
    return rect.bottom + offsetTop < 0 ? STATUS.ABOVE_VIEWPORT : rect.top + offsetBottom > window.innerHeight ? STATUS.BENEATH_VIEWPORT : STATUS.WITHIN_VIEWPORT;
  }

  trigger(props = this.props) {
    // as we throttle this function on subscribe, it can be invoked even
    // after this component did unmount
    // IN THAT CASE, ABORT.
    if (!this.refs[FLAG_REF]) return;

    const { handleAppear, once = true } = props;
    const { status } = this.state;
    const newStatus = this.status(props);
    if (status !== newStatus) this.setState({ status: newStatus });

    // (scrolling above | beneath) || (scrolling within viewport but once => donothing)
    if (status === newStatus && (newStatus !== STATUS.WITHIN_VIEWPORT || once)) return;
    // initial, but outside viewport
    if (status === STATUS.INIT && newStatus !== STATUS.WITHIN_VIEWPORT) return;

    handleAppear(newStatus, status, this.refs[FLAG_REF]);
  }
  render() {
    const { className, children, ...props } = this.props;
    const { status } = this.state;
    props.className = cx({
      'view-flag--above-viewport': status === STATUS.ABOVE_VIEWPORT,
      'view-flag--within-viewport': status === STATUS.WITHIN_VIEWPORT,
      'view-flag--beneath-viewport': status === STATUS.BENEATH_VIEWPORT
    }, 'view-flag', className);
    return <div ref={FLAG_REF} {...props}>{children}</div>;
  }
}

ViewFlag.STATUS = STATUS;

export default ViewFlag;
