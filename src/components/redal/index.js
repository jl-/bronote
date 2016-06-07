/**
 * <Redal
 *   variant // {string?}
 *   scoped // {boolean? := `false`}
            // default to append the modal dom to body (portal pattern);
            // set as `true` to leave the actually modal dom where <Redal> is used,
            // which is useful when you don't want the modal to be full screen, in which case
            // you also need to set a `transform` css property rather than `none` on
            // any closest ancestor you want the modal to be scoped to, then the modal will be
            // just the full size of that ancestor
 *   enterTimeout, leaveTimeout // {number} same as your animation-duration for css animation
 *   willEnter, didEnter, willLeave, didLeave // callback for modal lifecycles
 *   maskToggle // {boolean? := `false`} should close the modal or not when you click on the mask
 *   handleMaskClick // {function?} (event, innerDOM)
 *                   // if `!handleMaskClick(e,innerDOM)` then will close, vice versa.
 *                   // If this function is set, will ignore `maskToggle`
 *   hidden // { boolean := `false`}
 * >
 *   <Redal.X> x </Redal.X>
 *   <div className='redal-header'></div>
 *   <div className='redal-body'></div>
 *   <div className='redal-footer'>
 *     <Redal.X beforeLeave={}> confirm </Redal.X>
 *     <Redal.X> cancel </Redal.X>
 *   </div>
 * </Redal>
 *
 *
 *
 *
 **/
import React, { Component, Children, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import ReactTransitionGroup from 'react-addons-transition-group';
import RedalWrapper from './wrapper';
import RedalX from './x';
import './style.scss';
const renderSubtreeIntoContainer = ReactDOM.unstable_renderSubtreeIntoContainer;

const DEFAULT_TIMEOUT = 0;

const STATUS_SHOWN = 1;
const STATUS_HIDDEN = 2;

const DEFAULT_VARIANT = 'redal';

function replaceRedalX(children, replace) {
  return Children.map(children, child => {
    if (child && child.type === RedalX) {
      return replace(child);
    } else if (child && child.props && typeof child.props.children === 'object') {
      return React.cloneElement(child, undefined, replaceRedalX(child.props.children, replace));
    }
    return child;
  });
}

class Redal extends Component {
  static defaultProps = {
    hidden: true,
    variant: DEFAULT_VARIANT
  };

  constructor(props, context) {
    super(props, context);
    this.state = { hidden: props.hidden };
    this.close = ::this.close;
    this.delegateRedalX = ::this.delegateRedalX;
  }
  componentWillReceiveProps(nextProps) {
    const hidden = nextProps.hidden !== this.props.hidden ? nextProps.hidden : this.state.hidden;
    if (hidden !== this.state.hidden) this.setState({ hidden });
    if (nextProps.scoped !== true) {
      this.toggle(hidden, nextProps);
    }
  }
  componentDidMount() {
    const props = this.props;
    if (props.scoped === true) return;
    this.node = document.createElement('div');
    this.node.className = `${props.variant}-portal`;
    document.body.appendChild(this.node);
    this.toggle(props.hidden, props);
  }
  componentWillUnmount() {
    if (!this.node) return;
    ReactDOM.unmountComponentAtNode(this.node);
    document.body.removeChild(this.node);
  }

  close() {
    this.toggle(true);
  }
  open() {
    this.toggle(false);
  }
  toggle(hidden = !this.state.hidden, { ...props } = this.props) {
    this.setState({ hidden });
    if (props.scoped !== true) {
      props.hidden = hidden;
      this.renderPortal(props);
    }
  }
  delegateRedalX(redalX) {
    return React.cloneElement(redalX, { variant: this.props.variant, onClick: this.createLeaveHandler(redalX.props.beforeLeave) });
  }
  createLeaveHandler(beforeLeave) {
    const handler = typeof beforeLeave === 'function' ? e => {
      e.stopPropagation();
      const shouldLeave = beforeLeave();
      if (shouldLeave === false) return;
      if (!shouldLeave || typeof shouldLeave.then !== 'function') return this.close();
      shouldLeave.then(this.close);
    } : this.close;
    return handler;
  }

  build(pristineProps) {
    const { component = 'div', rootClassName, enterTimeout = DEFAULT_TIMEOUT, leaveTimeout = enterTimeout, children, hidden, ...props } = pristineProps;
    const content = hidden ? null : (
      <RedalWrapper
        {...props}
        key={`${props.variant}wrapper`}
        enterTimeout={enterTimeout}
        leaveTimeout={leaveTimeout}
        close={this.close}>
        {replaceRedalX(children, this.delegateRedalX)}
      </RedalWrapper>
    );

    return (
      <ReactTransitionGroup
        component={component}
        className={rootClassName}>
        {content}
      </ReactTransitionGroup>
    );
  }

  renderPortal(props) {
    this.portal = renderSubtreeIntoContainer(this, this.build(props), this.node);
  }

  render() {
    const { scoped, ...props } = this.props;
    if (scoped !== true) return null;
    props.hidden = this.state.hidden;
    return this.build(props);
  }
}

Redal.X = RedalX;

export default Redal;
