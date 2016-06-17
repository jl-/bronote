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
      return (
        <li key={id}>
        {notebooks[id].name}
        </li>
      );
    });
    return <ul>{itemsList}</ul>;
  }
  render() {
    const { actions, notebooks, notebook, sources, workspace, ...props } = this.props;
    console.log(this.props);
    props.className = cx(props.className, styles.root);
    return (
      <Dropdown {...props}>
        <Dropdown.Trigger className={styles.current}>
          <span>
          hello
          </span>
        </Dropdown.Trigger>
        <Dropdown.Content align='bc' className='h--full'>
          {this.renderNotebooks(notebooks, sources)}
        </Dropdown.Content>
      </Dropdown>
    );
  }
}

export default NotebooksSelector;

