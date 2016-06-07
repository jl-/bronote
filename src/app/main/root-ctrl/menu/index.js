import React, { Component } from 'react';
import cx from 'classnames';
import styles from './style.scss';

function Menu({ ...props }) {
  props.className = cx(props.className, styles.root);
  return (
    <ul {...props}>
      <li className={styles.action}>
        <i
          className={styles.create}
          data-tooltip={__('app.notebooks.phrases.createNotebook')}
        />
      </li>
    </ul>
  );
}

export default Menu;
