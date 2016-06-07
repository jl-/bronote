/**
 * <TagsEditor
 *   tags={[]}
 *   suggestions={[]}
 *   maxTagsCount={}
 *   onTagChange={}
 *   onTagRemove={}
 *
 * />
 *
 *
 */
import React, { Component } from 'react';
import cx from 'classnames';
import cloneDeep from 'lodash/clonedeep';
import linkFuncs from '../../../utils/lib/link-funcs';
import './styles.scss';

const KEY_CODE_ENTER = 13;
const TAG_INPUT_REF = Symbol('tag input');

class TagsEditor extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { tags: cloneDeep(props.tags || []) };
    this.handleKeyUp = ::this.handleKeyUp;
    this.focus = ::this.focus;
  }
  getTags() {
    return this.state.tags;
  }
  focus(e) {
    const input = this.refs[TAG_INPUT_REF];
    if (!input) return;
    e && e.preventDefault();
    input.focus();
  }
  removeTag(index) {
    const { tags } = this.state;
    const { onTagRemove } = this.props;
    const removedTag = tags.splice(index, 1);
    this.setState({ tags });
    if (typeof onTagRemove === 'function') onTagRemove(removedTag && removedTag[0]);
  }
  handleKeyUp(e) {
    if (e.keyCode !== KEY_CODE_ENTER) return;
    const input = this.refs[TAG_INPUT_REF];
    const value = input.value;
    const { onTagConfirm } = this.props;
    const { tags } = this.state;
    const isUnique = tags.indexOf(value) === -1;
    const couldAdd = typeof onTagConfirm === 'function' ? onTagConfirm(value, isUnique) : isUnique;
    if (couldAdd === true) {
      input.value = '';
      tags.push(value);
      this.setState({ tags });
    } else {
    }
  }
  renderTagsBox() {
    const tags = this.state.tags.map((tag, index) => {
      return (
        <li className='tags-box__tag' key={tag}>
          <span>{tag}</span>
          <i className='tags-box__tag-x fa fa-times-circle' onClick={() => this.removeTag(index)}></i>
        </li>
      );
    });
    return <ul className='tags-box'>{tags}</ul>;
  }
  renderTagInput() {
    const { maxTagsCount, placeholder } = this.props;
    const canAddNewTag = typeof maxTagsCount !== 'number' || maxTagsCount > this.state.tags.length;
    return canAddNewTag ?
      <input ref={TAG_INPUT_REF} placeholder={placeholder} className='tag-input' type='text' onKeyUp={this.handleKeyUp} /> :
      null;
  }
  render() {
    const { component = 'div', children, className, placeholder, ...props } = this.props;
    props.className = cx('tags-editor', className);
    props.onClick = linkFuncs(props.onClick, this.focus);
    return React.createElement(component, props, this.renderTagsBox(), this.renderTagInput());
  }
}

export default TagsEditor;
