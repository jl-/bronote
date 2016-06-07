/**
 * <ABCtrl triggerType='hover' interactive variant='dropdown' onActivate onDeactivate ignoreBlur toggleable>
 *   <ABCtrl.Trigger component></ABCtrl.Trigger>
 *   <ABCtrl.Content  align='bottom-center left-center right-center top-center' onClick>
 *   </ABCtrl.Content>
 * </ABCtrl>
 *
 *
 *
 *
 * */

import React, { Component, Children } from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import ABCtrlTrigger from './trigger';
import ABCtrlContent from './content';
import domContains from 'utils/lib/domContains';
import './style.scss';

const TRIGGER_REF = Symbol('trigger');

class ABCtrl extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { active: props.active };
  }
  componentDidMount() {
    this.setBlurHandler();
  }
  componentWillReceiveProps({ active }) {
    if (active !== this.props.active) {
      this.toggle(active);
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    return this.props !== nextProps || this.state !== nextState;
  }
  componentWillUnmount() {
    (typeof this.unsetBlurHandler === 'function') && this.unsetBlurHandler();
  }
  setBlurHandler(props = this.props) {
    const donSet = props.ignoreBlur === true || props.triggerType !== 'click' ||
      typeof this.unsetBlurHandler === 'function';
    if (donSet) return;

    const handler = (e) => {
      const shouldDeactivate = this.state.active && !domContains(ReactDOM.findDOMNode(this), e.target);
      shouldDeactivate && this.toggle(false);
    };
    document.addEventListener('click', handler);
    this.unsetBlurHandler = () => document.removeEventListener('click', handler);
  }

  toggle(active = !this.state.active) {
    this.setState({ active });
    active && typeof this.props.onActivate === 'function' && this.props.onActivate(this);
    !active && typeof this.props.onDeactivate === 'function' && this.props.onDeactivate(this);
  }

  render() {
    const {
      triggerType = 'hover', toggleable = true, interactive = true, variant = 'ab-ctrl'
      , className, children, component = 'div', onActive, onInactive, ...props,
    } = this.props;
    const { active } = this.state;
    const inner = Children.map(children, child => {
      if (!child || (child.type !== ABCtrlTrigger && child.type !== ABCtrlContent)) return child;
      const { onClick, handleContentClick, ...childProps } = child.props;
      if (child.type === ABCtrlContent) {
        const clickHandler = handleContentClick || onClick;
        childProps.className = cx(
          childProps.className,
          `${variant}-content`, `${variant}-content--${childProps.align || 'bc'}`
        );
        childProps.onClick = (e) => {
          const shouldDeactivate = typeof clickHandler === 'function' ? clickHandler(e) !== false : !interactive;
          shouldDeactivate && this.toggle(false);
        };
      } else if (child.type === ABCtrlTrigger) {
        childProps.className = cx(childProps.className, `${variant}-trigger`);
        childProps.ref = TRIGGER_REF;
        if (triggerType === 'click') {
          childProps.onClick = (e) => {
            if (typeof onClick !== 'function' || onClick(e) !== false) {
              if (!active || (toggleable)) {
                this.toggle();
              }
            }
          };
        } else if (triggerType === 'hover') {
          const triggerHolder = interactive ? props : childProps;
          triggerHolder.onMouseEnter = () => this.toggle(true);
          triggerHolder.onMouseLeave = () => this.toggle(false);
        }
      }
      return React.cloneElement(child, childProps);
    });
    props.className = cx({
      [`${variant}--active`]: active,
      [`${variant}--inactive`]: !active,
    }, className, variant);
    return React.createElement(component, props, inner);
  }
}

ABCtrl.Trigger = ABCtrlTrigger;
ABCtrl.Content = ABCtrlContent;

export default ABCtrl;
