import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Dropdown from 'components/ab-ctrl/dropdown';
import cx from 'classnames';
import styles from './style.scss';

const LIST_REF = Symbol('notebooks list');
const ACTION_VIEW = 'view';

function getNotebookId(target, root) {
  let notebookId;
  while (target !== root) {
    notebookId = +target.getAttribute('data-notebookId');
    if (notebookId) return notebookId;
    target = target.parentNode;
  }
}
function getTargetAction(target, root) {
  let action;
  while (target !== root) {
    action = target.getAttribute('data-action');
    if (action) return action;
    target = target.parentNode;
  }
}

class NotebooksSelector extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleNotebooksListClick = ::this.handleNotebooksListClick;
  }
  handleNotebooksListClick({ target }) {
    const root = ReactDOM.findDOMNode(this.refs[LIST_REF]);
    const action = getTargetAction(target, root);
    if (!action) return;
    const notebookId = getNotebookId(target, root);
    const { actions } = this.props;
    if (action === ACTION_VIEW) {
      actions.setNotebook(notebookId);
    }
  }
  renderNotebooks(ids, { notebooks }) {
    const itemsList = ids.map(id => {
      const notebook = notebooks[id];
      return (
        <li
          key={id}
          className={styles.item}
          data-notebookId={id}
        >
          <span
            className={styles.itemContent}
            data-action={ACTION_VIEW}
          >
            <i className={styles.itemIcon} />
            <span className={styles.itemName} title={notebook.name}>
              {notebook.name}
            </span>
          </span>
        </li>
      );
    });
    return (
      <ul
        ref={LIST_REF}
        className={styles.list}
      >
        {itemsList}
      </ul>
    );
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
        <Dropdown.Content align='bl' onClick={this.handleNotebooksListClick}>
          {this.renderNotebooks(notebooks, sources)}
        </Dropdown.Content>
      </Dropdown>
    );
  }
}

export default NotebooksSelector;

