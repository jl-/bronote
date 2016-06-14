/**
 *
 *
 */
import React, { Component } from 'react';
import Redal from 'components/redal';
import { REDAL_DURATION } from 'configs/common';
import NotebookEditor from './editor';
import styles from './style.scss';

const REDAL_REF = Symbol('redal');
const EDITOR_REF = Symbol('editor');

class NotebookEditorWithRedal extends Component {
  toggle(hidden) {
    this.refs[REDAL_REF].toggle(hidden);
  }
  render() {
    const { hidden, maskToggle = false, willLeave, didLeave, ...props } = this.props;
    return (
      <Redal
        ref={REDAL_REF}
        hidden={hidden}
        willLeave={willLeave}
        didLeave={didLeave}
        maskToggle={maskToggle}
        enterTimeout={REDAL_DURATION}
        className={styles.root}
      >
        <NotebookEditor {...props} ref={EDITOR_REF} />
      </Redal>
    );
  }
}

export default NotebookEditorWithRedal;

