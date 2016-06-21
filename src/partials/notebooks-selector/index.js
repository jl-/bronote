import React, { Component } from 'react';
import Dropdown from 'components/ab-ctrl/dropdown';
import cx from 'classnames';
import styles from './style.scss';

class NotebooksSelector extends Component {
  constructor(props, context) {
    super(props, context);
  }
  renderNotebooks(ids, { notebooks }) {
    const itemsList = ids.map(id => {
      const notebook = notebooks[id];
      return (
        <li key={id} className={styles.item}>
          <i className={styles.itemIcon} />
          <span className={styles.itemName} title={notebook.name}>
            {notebook.name}
          </span>
        </li>
      );
    });
    return <ul className={styles.list}>{itemsList}</ul>;
  }
  render() {
    const { actions, notebooks, sources, workspace, ...props } = this.props;
    const notebook = sources.notebooks[workspace.notebookId];
    if (!notebook) return null;

    props.className = cx(props.className, styles.root);
    return (
      <Dropdown {...props}>
        <Dropdown.Trigger className={styles.trigger}>
          <i className={styles.titleIcon} />
          <span className={styles.titleName}>{notebook.name}</span>
          <i className={styles.triggerIcon} />
        </Dropdown.Trigger>
        <Dropdown.Content align='bl'>
          {this.renderNotebooks(notebooks, sources)}
        </Dropdown.Content>
      </Dropdown>
    );
  }
}

export default NotebooksSelector;

