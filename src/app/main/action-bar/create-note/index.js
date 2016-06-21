import React, { Component } from 'react';
import Dropdown from 'components/ab-ctrl/dropdown';
import cx from 'classnames';
import styles from './style.scss';

function CreateNoteBtn({ ...props }) {
  props.className = cx(props.className, styles.root);
  return (
    <div {...props}>
      <button className={styles.btn}>
        <i className='icon icon-plus' />
        {__('app.notebooks.phrases.newNoteIn')}
      </button>
      <Dropdown className={styles.dropdown}>
        <Dropdown.Trigger component='button' className={styles.dropdownTrigger}>
          <i className='icon icon-down1' />
        </Dropdown.Trigger>
        <Dropdown.Content className={styles.dropdownContent} component='ul' align='br'>
          <li className={styles.action}>
            {__('app.notebooks.phrases.newNoteIn')}
          </li>
          <li className={styles.action}>
            {__('app.notebooks.phrases.newNoteIn')}
          </li>
        </Dropdown.Content>
      </Dropdown>
    </div>
  );
}

export default CreateNoteBtn;
