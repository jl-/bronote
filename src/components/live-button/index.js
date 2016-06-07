/**
 * import LiveButton from 'live-button';
 * <LiveButton
 *   status={LiveButton.STATUS.PENDING | LiveButton.STATUS.DISABLED}
 *   icons={{
 *     [LiveButton.STATUS.PENDING]: 'fa fa-spinner fa-spin'
 *   }}
 *   contents={{
 *     [LiveButton.STATUS.NORNAL]: 'submit',
 *     [LiveButton.STATUS.PENDING]: [<i></i>, <p>hello</p>]
 *   }},
 *   icon={}
 *   content={}
 * />
 *
 *
 */
import React, { Component, createElement } from 'react';
import cx from 'classnames';
import STATUS from './status';
import styles from './style.scss';

const DEFAULT_VARIANT = 'live-button';

function transformIcon(icon, variant) {
  return icon && typeof icon === 'string' ?
    <span className={cx(`${variant}-icon`, icon)}></span> : icon;
}
function transformContent(content) {
  return content;
}
function contentifyProps({ icon, content, icons, contents, ...props }, status, variant) {
  if (props.children) return props;
  const iconEl = transformIcon(icon || icons && icons[status], variant);
  const contentEl = transformContent(content || contents && contents[status], variant);
  const children = props.children = [];
  iconEl && children.push(iconEl);
  contentEl && children.push(contentEl);
  return props;
}
class LiveButton extends Component {
  constructor(props) {
    super(props);
    this.state = { status: props.status || STATUS.NORMAL };
    this.handleClick = ::this.handleClick;
  }
  componentWillReceiveProps({ status }) {
    if (status !== this.state.status) {
      this.setState({ status });
    }
  }
  componentWillUnmount() {
    this._gone = true;
  }
  handleClick(e) {
    const result = this.props.onClick(e);
    const isPromise = result && typeof result.then === 'function';
    if (!isPromise) return result;
    this.setState({ status: STATUS.PENDING | STATUS.DISABLED });
    result.then(resolevd => {
      !this._gone && this.setState({ status: resolevd ? STATUS.OK : STATUS.NORMAL });
    }, error => {
      !this._gone && this.setState({ status: STATUS.FAILED });
    });
  }
  render() {
    const { component = 'button', variant = DEFAULT_VARIANT, onClick, ...props } = this.props;
    const { status } = this.state;
    props.className = cx({
      [`${variant}--pending`]: (status & STATUS.PENDING) || props.pending,
      [`${variant}--normal`]: status & STATUS.NORMAL,
      [`${variant}--ok`]: status & STATUS.OK,
      [`${variant}--failed`]: status & STATUS.FAILED,
      [`${variant}--disabled event-disabled`]: (status & STATUS.DISABLED) || props.disabled
    }, variant, props.className);

    props.disabled = !!(status & STATUS.DISABLED);
    if(typeof onClick === 'function') props.onClick = this.handleClick;
    return createElement(component, contentifyProps(props, status, variant));
  }
}

LiveButton.STATUS = STATUS;

export default LiveButton;
