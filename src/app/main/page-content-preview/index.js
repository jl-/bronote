import React, { Component } from 'react';
import cx from 'classnames';
import styles from './styls.scss';
import parse from './parse';

const ROOT_REF = Symbol('root');

class NotebookPageContentPreview extends Component {
  constructor(props, context) {
    super(props, context);
    const { content } = this.props;
    this.state = { parsed: null };
    this.parse(content);
  }
  componentWillReceiveProps({ content }) {
    if (content !== this.props.content) {
      this.setState({ parsed: null });
      this.parse(content);
    }
  }
  parse(content) {
    parse(content).then(parsed => {
      if (content === this.props.content) {
        this.setState({ parsed });
      }
    });
  }
  render() {
    const { content, ...props } = this.props;
    props.className = cx(props.className, styles.root);
    return (
      /* eslint react/no-danger: 0 */
      <div
        ref={ROOT_REF}
        {...props}
        dangerouslySetInnerHTML={{ __html: this.state.parsed }}
      >
      </div>
    );
  }
}

export default NotebookPageContentPreview;

