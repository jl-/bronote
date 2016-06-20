import React, { Component } from 'react';
import cx from 'classnames';
import styles from './style.scss';
import CodeMirror from 'codemirror';
import CodeMirrorGFM from 'codemirror/mode/gfm/gfm';
import CodeMirrorJavaScript from 'codemirror/mode/javascript/javascript';
import CodeMirrorMarkdown from 'codemirror/mode/markdown/markdown';
import hljs from 'highlight.js';

class NotebookPageEditor extends Component {
  constructor(props, context) {
    super(props, context);
    this.updateEditor = ::this.updateEditor;
  }
  componentDidMount() {
    const editor = CodeMirror.fromTextArea(document.getElementById('page-editor'), {
      mode: 'gfm',
      lineNumbers: false,
      matchBrackets: true,
      lineWrapping: true,
      theme: 'solarized',
      extraKeys: { Enter: 'newlineAndIndentContinueMarkdownList' }
    });
    editor.on('change', this.updateEditor);
  }
  updateEditor() {
  }
  render() {
    const { actions, ...props } = this.props;
    props.className = cx(props.className, styles.root);
    return (
      <div {...props}>
        <textarea id='page-editor' className='h--full v--full' />
      </div>
    );
  }
}

export default NotebookPageEditor;

