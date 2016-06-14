import React, { Component } from 'react';
import cx from 'classnames';
import styles from './style.scss';

class NotebookChaptersCtrl extends Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    const { actions, ...props } = this.props;
    props.className = cx(props.className, styles.root);
    return (
      <div {...props}>
      </div>
    );
  }
}

export default NotebookChaptersCtrl;

