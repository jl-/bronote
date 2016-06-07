import React, { Component } from 'react';
import cx from 'classnames';
import styles from './style.scss';

class Workspace extends Component {
  render() {
    const { ...props } = this.props;
    props.className = cx(props.className, styles.root);
    return (
      <main {...props}>
      </main>
    );
  }
}

export default Workspace;
