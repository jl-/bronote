/**
 * <FlatTabs>
 *   <FlatTabs.TabCtrls>
 *     <FlatTabs.TabCtrl></FlatTabs.TabCtrl>
 *     <FlatTabs.TabCtrl></FlatTabs.TabCtrl>
 *   </FlatTabs.TabCtrls>
 *   <FlatTabs.TabContents>
 *     <FlatTabs.TabContent></FlatTabs.TabContent>
 *     <FlatTabs.TabContent></FlatTabs.TabContent>
 *   </FlatTabs.TabContents>
 * </FlatTabs>
 */
import React, { Component, cloneElement } from 'react';
import linkFuncs from '../../../utils/lib/link-funcs';
import cx from 'classnames';
import TabCtrls from './tab-ctrls';
import TabCtrl from './tab-ctrl';
import TabContents from './tab-contents';
import TabContent from './tab-content';
import './style.scss';

const TAB_CTRLS_REF = Symbol('FlatTabs.TabCtrls');
const TAB_CONTENTS_REF = Symbol('FlatTabs.TabContents');

class FlatTabs extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { currentIndex: props.currentIndex || 0 };
  }
  switchTo(nextIndex) {
    const { currentIndex } = this.state;
    const { onChange } = this.props;
    if (nextIndex === currentIndex) return;
    this.setState({ currentIndex: nextIndex });
    if (typeof onChange === 'function') onChange(nextIndex, currentIndex);
  }
  isTabCtrl(node) {
    return node.className.indexOf('flat-tabs__ctrl') !== -1;
  }
  handleTabCtrlsClick(e) {
    let node = e.target;
    while (node !== null && !this.isTabCtrl(node)) node = node.parentElement;
    if (node === null) return;
    const nextIndex = [].slice.call(node.parentNode.children).indexOf(node);
    this.switchTo(nextIndex);
  }
  renderTabCtrls(children = this.props.children) {
    const { currentIndex } = this.state;
    const ctrls = children && children[0];
    if (!ctrls || ctrls.type !== TabCtrls) throw Error('FlatTabs should has a TabCtrls as its first child');
    return cloneElement(ctrls, {
      ...ctrls.props,
      currentIndex,
      ref: TAB_CTRLS_REF,
      onClick: linkFuncs([ctrls.props.onClick, ::this.handleTabCtrlsClick], result => result === false)
    });
  }
  renderTabContents(children = this.props.children) {
    const { currentIndex } = this.state;
    const contents = children && children[1];
    if (!contents || contents.type !== TabContents) throw Error('FlatTabs should has a TabContents as its second child');
    return cloneElement(contents, {
      ...contents.props,
      currentIndex,
      ref: TAB_CONTENTS_REF
    });
  }
  render() {
    const { children, currentIndex, ...props } = this.props;
    props.className = cx(props.className, 'flat-tabs');
    return (
      <div {...props}>
        {this.renderTabCtrls(children)}
        {this.renderTabContents(children)}
      </div>
    );
  }
}

FlatTabs.TabCtrls = TabCtrls;
FlatTabs.TabCtrl = TabCtrl;
FlatTabs.TabContents = TabContents;
FlatTabs.TabContent = TabContent;

export default FlatTabs;
