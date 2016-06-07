import React, { Component } from 'react';
import cx from 'classnames';
import styles from './style.scss';

class NotebookEditor extends Component {
  render() {
    const { ...props } = this.props;
    props.className = cx(props.className, styles.root);
    return (
      <div {...props}>
      </div>
    );
  }
}

export default NotebookEditor;

