import React, { Component } from 'react';
import cx from 'classnames';
import NotebookEditor from 'partials/notebook-editor';
import styles from './style.scss';

class Notebooks extends Component {
  render() {
    const { ...props } = this.props;
    props.className = cx(props.className, styles.root);
    return (
      <div {...props}>
        <NotebookEditor />
      </div>
    );
  }
}

export default Notebooks;
