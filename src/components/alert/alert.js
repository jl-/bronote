import ReactDOM from 'react-dom';
import React, { Component, Children, cloneElement } from 'react';
import Redal from '../redal';
import cx from 'classnames';
import uid from '../../../utils/lib/uid';
import { ALERT_ANIM_DURATION } from '../../configs/common';
import TYPES from './types';
import './style.scss';

const VARIANT = 'ralert';
const REDAL_REF = Symbol('redal');

const ICON_OF_TYPE = {
  [TYPES.INFO]: 'info',
  [TYPES.SUCCESS]: 'success',
  [TYPES.WARN]: 'warning',
  [TYPES.ERROR]: 'error'
};
const ALERT_OF_TYPE = {
  [TYPES.INFO]: `${VARIANT}--info`,
  [TYPES.SUCCESS]: `${VARIANT}--success`,
  [TYPES.WARN]: `${VARIANT}--warning`,
  [TYPES.ERROR]: `${VARIANT}--error`
};

const okFunc = () => true;

class Alert extends Component {
  static defaultProps = {
    hidden: true
  };
  constructor(props, context) {
    super(props, context);
    this.state = { hidden: !!props.hidden, content: null };
    this.hide = this.toggle.bind(this, true);
  }

  /**
   * auto close the alert after ms specified by duration
   * only call when there is a this.state.content.duration > 0
   */
  bindAutoHide(duration) {
    if (duration > 0 && !this.autoHideTimer) {
      this.autoHideTimer = setTimeout(() => {
        this.hide();
        this.autoHideTimer = null;
      }, duration);
    }
  }

  /**
   * @param {boolean?object?} hidden show the alert be hidden
   * boolean: self explained
   * undefined: !this.state.hidden
   * object: set for content, and show it
   */
  toggle(hidden = !this.state.hidden) {
    const status = typeof hidden === 'boolean' ? hidden : false;
    this.setState({ hidden: status });
    if (hidden && typeof hidden === 'object') this.info(hidden);
  }

  /**
   * @param {object} content
   * @param {string} content.type
   * 'info', 'warn', 'success', 'error'
   * @param {string?boolean?Component?} content.icon
   * show icon of type for default;
   * false: don't show icon
   * string: icon class
   * Component: icon
   *
   * @param {string?} content.title
   * @param {any?} content.content
   * will override text, react component? html?
   * @param {number} content.duration
   * with duration set, the alert will be closed after ms,
   * and `cancel`, `confirm` below has no effest
   *
   * @param {array?function?} content.cancal
   * if evaluated to false, won't show cancel button.
   * array: see below
   * function: same as `content.cancel[1]` below
   * @param {string|Component} content.cancel[0]
   * string: cancel button text, default to 'Cancel'
   * Component: button component.
   * @param {function?} content.cancel[1]
   * function: invoke on click, return false to prevent from closing
   * otherwise close the alert
   *
   * @param {array?function?} content.confirm
   * array: see below
   * function: same as `content.confirm[1]` below
   * @param {string|Component} content.confirm[0]
   * string: confirm button text, default to 'OK'
   * Component: react component for the button
   * @param {function?} content.confirm[1]
   * function: invoke on click, return false to prevent from closing
   * otherwise close the alert
   *
   */
  show(content) {
    this.setState({ hidden: false, content });
  }

  /**
   * render the footer for the alert,
   * including: cancel button? confirm button?
   * NOTICE: when duration > 0, show nothing but autoHide
   */
  renderCtrls(duration, cancel, confirm) {
    // duration > 0, auto close. do nothing here, but setTimeout to
    // perform a toggle(true) on componentDidMount and componentWillReceiveProps
    if (duration > 0) {
      this.bindAutoHide(duration);
      return null;
    }
    const cancelHandler = !cancel ? null : typeof cancel === 'function' ? cancel : cancel[1] || okFunc;
    const confirmHandler = !confirm ? okFunc : typeof confirm === 'function' ? confirm : confirm[1] || okFunc;
    const finalCancelHandler = cancelHandler ? (e) => cancelHandler(e) !== false && this.hide() : null;
    const finalConfirmHandler = confirmHandler ? (e) => confirmHandler(e) !== false && this.hide() : null;

    const cancelEl = cancel && cancel[0];
    const confirmEl = confirm && confirm[0];

    const finalCancelEl = finalCancelHandler ? (cancelEl && cancelEl.$$typeof ?
      cloneElement(cancelEl, {
        className: cx(cancelEl.props.className, `${VARIANT}__ctrl-cancel`),
        onClick: finalCancelHandler
      }) : <button className={`${VARIANT}__ctrl-cancel`} onClick={finalCancelHandler}>{cancelEl || 'Cancel'}</button>
    ) : null;

    const finalConfirmEl = finalConfirmHandler ? (confirmEl && confirmEl.$$typeof ?
      cloneElement(confirmEl, {
        className: cx(confirmEl.props.className, `${VARIANT}__ctrl-confirm`),
        onClick: finalConfirmHandler
      }) : <button className={`${VARIANT}__ctrl-confirm`} onClick={finalConfirmHandler}>{confirmEl || 'OK'}</button>
    ) : null;

    return (
      <div className={`${VARIANT}__ctrls`}>
        {finalCancelEl}
        {finalConfirmEl}
      </div>
    );
  }
  /**
   * See function params of `show` above
   * @return {null?jsx} content
   * null: if this.content is not an object
   * jsx otherwise
   */
  renderContent(data = this.state.content) {
    if (!data || typeof data !== 'object') return null;
    const { type, icon = ICON_OF_TYPE[type], title, content, duration, cancel, confirm, ...props } = data;
    const iconEl = typeof icon === 'string' ? <i className={icon}></i> : icon;
    const titleEl = typeof title === 'string' ? <h2 className={`${VARIANT}__title`}>{title}</h2> : title;
    const detail = typeof content === 'string' ? <p className={`${VARIANT}__content`}>{content}</p> : content;
    const ctrls = this.renderCtrls(duration, cancel, confirm);
    props.className = cx(props.className, '')
    return (
      <div {...props}>
        {iconEl}
        {titleEl}
        {detail}
        {ctrls}
      </div>
    );
    return iconEl;
  }
  render() {
    const { content: inlineContent, ...props } = this.props;
    const { hidden, content } = this.state;
    const finalContent = content || inlineContent;
    props.enterTimeout = props.enterTimeout >= 0 ? props.enterTimeout :
      finalContent && finalContent.enterTimeout >= 0 ? finalContent.enterTimeout :
      ALERT_ANIM_DURATION;
    if (finalContent) {
      finalContent.didLeave && (props.didLeave = finalContent.didLeave);
    }
    props.className = cx(props.className, ALERT_OF_TYPE[finalContent && finalContent.type]);
    return (
      <Redal scoped={content ? true : false} {...props} hidden={hidden} ref={REDAL_REF} variant={VARIANT}>
        {this.renderContent(finalContent)}
      </Redal>
    );
  }
}

Alert.newInstance = (config) => {
  const { className, ...props } = config || {};
  const root = document.createElement('div');
  root.className = cx(className, `${VARIANT}-root`);
  document.body.appendChild(root);
  const instance = ReactDOM.render(<Alert {...props} />, root);
  return {
    component: instance,
    toggle: alertProps => instance.toggle(alertProps),
    show: alertProps => instance.show(alertProps),
    destroy() {
      ReactDOM.unmountComponentAtNode(root);
      document.body.removeChild(root);
    }
  };
};

export default Alert;

