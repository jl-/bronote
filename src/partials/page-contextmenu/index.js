import React, { Component } from 'react';
import cx from 'classnames';
import styles from './style.scss';
import Redal from 'components/redal';

function PageContextMenu({ style, handleRename, handleDelete, ...props }) {
  return (
    <Redal
      className={styles.root}
      maskToggle={false}
      {...props}
    >
      <div className={styles.inner} style={style}>
        <ul className='list list--flat p-x--md m-y--0'>
          <li className={styles.item} onClick={handleRename}>{__('terms.rename')}</li>
          <li className={styles.item} onClick={handleDelete}>{__('terms.delete')}</li>
        </ul>
      </div>
    </Redal>
  );
}

export default PageContextMenu;
