import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

const DEFAULT_APPEAR_TIMEOUT = 0;
const DEFAULT_ENTER_TIMEOUT = 0;
const DEFAULT_LEAVE_TIMEOUT = 0;

function wrapTransitionName(name) {
  return typeof name === 'string' ? {
    appear: `${name}--appearing-begin`,
    appearActive: `${name}--appearing-active`,
    enter: `${name}--entering-begin`,
    enterActive: `${name}--entering-active`,
    leave: `${name}--leaving-begin`,
    leaveActive: `${name}--leaving-active`
  } : name || '';
}

const CSSTransitionGroup = ({
  children,
  transitionName,
  transitionAppearTimeout = DEFAULT_APPEAR_TIMEOUT,
  transitionEnterTimeout = DEFAULT_ENTER_TIMEOUT,
  transitionLeaveTimeout = DEFAULT_LEAVE_TIMEOUT,
  ...props
}) => {
  return (
    <ReactCSSTransitionGroup
      component='div'
      {...props}
      transitionName={wrapTransitionName(transitionName)}

      transitionAppear={transitionAppearTimeout > 0}
      transitionEnter={transitionEnterTimeout > 0}
      transitionLeave={transitionLeaveTimeout > 0}

      transitionAppearTimeout={transitionAppearTimeout}
      transitionEnterTimeout={transitionEnterTimeout}
      transitionLeaveTimeout={transitionLeaveTimeout}
      >
      {children}
    </ReactCSSTransitionGroup>
  );
};

export default CSSTransitionGroup;
