/**
 * <TabCtrl
 *   current={}
 *   data={[{ hash }]}
 *   >
 * </TabCtrl>
 *
 *
 *
 **/
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import PaperSelect from '../paper-select';
import cx from 'classnames';
import flatten from 'lodash/flattendeep';
import throttle from '../../../utils/lib/throttle';
import './style.scss';

const CONTAINER_REF = Symbol('container');
const CTRL_REF = Symbol('ctrl');
const BODY_REF = Symbol('body');
const TAB_KEY = 'tab';
const THROTTLE_MS = 60;


class TabCtrl extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { current: this.parseCurrentTab(props) };
  }
  componentDidMount() {
    this.bindBodyAdjuster();
  }
  componentWillReceiveProps(nextProps) {
    const current = this.parseCurrentTab(nextProps);
    if (current !== this.state.current) {
      this.switchTab(current);
    }
  }
  componentWillUnmount() {
    typeof this.unBindBodyAdjuster === 'function' && this.unBindBodyAdjuster();
  }
  switchTab(current) {
    const prev = this.state.current;
    if (prev === current) return;
    const { handleTabChange } = this.props;
    this.setState({ current });
  }
  parseCurrentTab(props = this.props) {
    const tabs = flatten(props.data);
    const hash = props.location && props.location.hash || typeof window !== undefined && window.location.hash;
    let index = tabs.findIndex(tab => tab.hash === hash);
    if (!~index) index = tabs.findIndex(tab => tab.hash === props.current);
    return ~index ? tabs[index] : tabs[0];
  }
  bindBodyAdjuster() {
    if (typeof this.unBindBodyAdjuster === 'function') return;
    const handler = throttle(::this.adjustBody, THROTTLE_MS);
    window.addEventListener('resize', handler);
    this.unBindBodyAdjuster = () => window.removeEventListener('resize', handler);
    handler();
  }
  adjustBody() {
    const container = this.refs[CONTAINER_REF];
    const ctrl = this.refs[CTRL_REF];
    const style = ReactDOM.findDOMNode(this.refs[BODY_REF]).style;
    const totalHeight = container.offsetHeight, offsetHeight = ctrl.offsetHeight, offsetTop = ctrl.offsetTop;
    style.height = totalHeight - offsetHeight - offsetTop + 'px';
  }
  renderDescription(props = this.props) {
    const { renderDescription: render } = props;
    const { current } = this.state;
    const description = typeof render === 'function' ? render(current, data) : current.description;
    return <div className='tab-ctrl__description'>{description}</div>;
  }
  renderTabCtrlItem(item, index, current) {
    const inner = Array.isArray(item) ?
      <PaperSelect data={item} triggerType='hover' className='tab-ctrl__ctrl-sub' renderOption={(option, i) => this.renderTabCtrlItem(option, i, current)} selected={0}/> :
      <a href={item.hash} className='tab-ctrl__ctrl-item-link'>{item.title}</a>;
    return <li key={item.hash || index} className={cx('tab-ctrl__ctrl-item', { ['tab-ctrl__ctrl-item--active'] : item === current })}>{inner}</li>;
  }
  renderTabCtrl(props = this.props) {
    const { data, renderTabCtrlItem } = props;
    const { current } = this.state;
    const renderItem = typeof renderTabCtrlItem === 'function' ? (item, index, current) => {
      let ctrlItem = renderTabCtrlItem(item, index, current);
      if (ctrlItem === false) return this.renderTabCtrlItem(item, index, current);
      if (!ctrlItem) return null;
      if (ctrlItem.type !== 'li') ctrlItem = <li>{ctrlItem}</li>;
      return React.cloneElement(ctrlItem, { key: item.hash || index, ...ctrlItem.props, className: cx('tab-ctrl__ctrl-item', ctrlItem.props.className, { ['tab-ctrl__ctrl-item--active'] : item === current }) });
    } : ::this.renderTabCtrlItem;
    const items = data.map((item, index) => renderItem(item, index, current));
    return <ul className='tab-ctrl__ctrl' ref={CTRL_REF}>{items}</ul>;
  }
  renderTabContent(props = this.props) {
    const { renderTabContent: render, data } = props;
    const { current } = this.state;
    const body = typeof render === 'function' ? render(current, data) : null;
    return body ? React.cloneElement(body, {
      key: TAB_KEY
    }) : body;
  }

  render() {
    const { data, transitionName = '', transitionEnterTimeout = 0, transitionLeaveTimeout = 0, ...props } = this.props;
    props.className = cx(props.className, 'tab-ctrl');
    return (
      <div {...props} ref={CONTAINER_REF}>
      {this.renderDescription()}
      {this.renderTabCtrl()}
      <ReactCSSTransitionGroup
        component='div'
        ref={BODY_REF}
        className='tab-ctrl__body'
        transitionName={transitionName}
        transitionEnterTimeout={transitionEnterTimeout}
        transitionLeaveTimeout={transitionLeaveTimeout}
      >
        {this.renderTabContent()}
      </ReactCSSTransitionGroup>
      </div>
    );
  }
}

export default TabCtrl;

