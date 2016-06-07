import React, { Component } from 'react';
import cx from 'classnames';
import Dropdown from 'components/ab-ctrl/dropdown';
import styles from './style.scss';


class SearchCtrl extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { active: props.active };
    this.focus = ::this.focus;
    this.blur = ::this.blur;
  }
  focus() {
    this.setState({ active: true });
  }
  blur() {
    this.setState({ active: false });
  }
  render() {
    const { ...props } = this.props;
    const { active } = this.state;
    props.className = cx(props.className, styles.root);
    return (
      <Dropdown
        toggleable={false} {...props}
        onActivate={this.focus}
        onDeactivate={this.blur}
      >
        <Dropdown.Trigger
          component='label'
          className={active ? cx(styles.searchBox, styles.searchBoxActive) : styles.searchBox}
        >
          <i className='icon icon-search1' />
          <input
            type='text'
            className={styles.input}
            placeholder={__('app.search.phrases.placeholder')}
          />
        </Dropdown.Trigger>
        <Dropdown.Content className={styles.searchCombo} align='bc'>
          hello
        </Dropdown.Content>
      </Dropdown>
    );
  }
}

export default SearchCtrl;
