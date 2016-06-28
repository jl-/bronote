import React, { Component } from 'react';
import cx from 'classnames';
import styles from './style.scss';
import CodeMirror from 'codemirror';
import CodeMirrorGFM from 'codemirror/mode/gfm/gfm';
import CodeMirrorJavaScript from 'codemirror/mode/javascript/javascript';
import CodeMirrorMarkdown from 'codemirror/mode/markdown/markdown';
import CodeMirrorCSS from 'codemirror/mode/css/css';
import CodeMirrorKeyMapVim from 'codemirror/keymap/vim';
import NotebookPageContentPreview from '../page-content-preview';

const ROOT_REF = Symbol('root');

class NotebookPageContentEditor extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { previewHidden: true };
    this.saveContent = ::this.saveContent;
    this.showPreview = ::this.showPreview;
    this.hidePreview = ::this.hidePreview;
    this.togglePreview = ::this.togglePreview;
  }
  componentDidMount() {
    CodeMirror.commands.save = this.saveContent;
    const editor = this.editor = CodeMirror.fromTextArea(document.getElementById('page-editor'), {
      mode: 'gfm',
      keyMap: "vim",
      tabSize: 2,
      showCursorWhenSelecting: true,
      lineNumbers: false,
      matchBrackets: true,
      lineWrapping: true,
      theme: 'solarized',
      extraKeys: {
        Enter: 'newlineAndIndentContinueMarkdownList'
      }
    });
    this.setContent(this.props.page);
    // editor.on('change', this.updateEditor);
  }
  componentWillReceiveProps({ page }) {
    this.setContent(page);
  }
  setContent(page) {
    this.editor.setValue(page && page.content || '');
  }
  componentDidUpdate() {
    if (!this.state.prevHidden) {
      this.refs[ROOT_REF].focus();
    }
  }
  showPreview() {
    const content = this.getContent();
    setTimeout(() => this.editor.getInputField().blur(), 0);
    this.setState({ previewHidden: false });
  }
  hidePreview() {
    setTimeout(() => this.editor.focus(), 0);
    this.setState({ previewHidden: true });
  }
  togglePreview({ ctrlKey, keyCode }) {
    // ctrl-,
    if (!ctrlKey || keyCode !== 188) return;
    const { previewHidden } = this.state;
    if (previewHidden) {
      this.showPreview();
    } else {
      this.hidePreview();
    }
  }
  getContent() {
    const content = this.editor.getValue();
    return content;
  }
  saveContent() {
    this.props.handleChange();
  }
  renderPreview(hidden = this.state.previewHidden) {
    if (hidden) return null;
    const content = this.getContent();
    return (
      <NotebookPageContentPreview
        className={styles.preview}
        content={content}
      />
    );
  }
  render() {
    const { page, ...props } = this.props;
    props.className = cx(props.className, styles.root);
    return (
      <div
        {...props}
        ref={ROOT_REF}
        tabIndex='1'
        onKeyDown={this.togglePreview}
      >
        <textarea id='page-editor' className='h--full v--full' />
        {this.renderPreview()}
      </div>
    );
  }
}

export default NotebookPageContentEditor;

