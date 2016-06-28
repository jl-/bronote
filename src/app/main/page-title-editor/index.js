import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PaperInput from 'components/paper-form/input';

const INPUT_REF = Symbol('input');

class PageTitleEditor extends Component {
  componentWillReceiveProps({ page }) {
    const { page: prevPage } = this.props;
    if (page !== prevPage) {
      const input = this.refs[INPUT_REF];
      input.setValue(page && page.name || '').setError(null);
    }
  }
  getInput() {
    return this.refs[INPUT_REF];
  }
  render() {
    const { page, ...props } = this.props;
    return (
      <PaperInput
        ref={INPUT_REF}
        withUnderline={false}
        defaultValue={page && page.name}
        {...props}
      />
    );
  }
}

export default PageTitleEditor;
