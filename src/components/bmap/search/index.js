import React, { Component, PropTypes, Children } from 'react';
import cx from 'classnames';
import BmapSearchInput from './input';
import { uid } from '../../../../utils';

import './style.scss';

const INPUT_REF = Symbol('BmapSearch.Input');
const STATUS_BLUR = 1;
const STATUS_FOCUS = 2;

class BmapSearch extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { id: 'bmap-search_' + uid(), suggestions: [] };
  }
  setStatus(status) {
    this.setState({ status });
  }

  setLocation(location = {}) {
    this.refs[INPUT_REF].val(location.address);
    this.setState({ location, suggestions: [] });
    this.setStatus(STATUS_BLUR);
  }
  getLocation() {
    return this.state.location;
  }
  locate(point) {
    this.bmap.locate(point, undefined, location => this.setLocation(location));
  }

  withSuggestions(suggest, map) {
    if (suggest && !this.local && map) {
      this.local = new BMap.LocalSearch(map, { onSearchComplete: (result) => {
        const suggestions = result && result.wr || [];
        this.setState({ suggestions });
      }});
    }
  }
  fetchSuggestions(term) {
    this.setStatus(STATUS_FOCUS);
    this.local && this.local.search(term);
  }
  setSuggestion({ target }) {
    const uid = target && target.getAttribute('data-uid');
    this.state.suggestions.some(suggestion => {
      if (suggestion.uid === uid) {
        this.locate(suggestion.point);
        return true;
      }
    });
  }

  init(bmap, map, location) {
    this.bmap = bmap;
    this.setLocation(location);
    this.withSuggestions(this.props.suggest, map);
  }
  render() {
    const { suggest, map, className, children, ...props } = this.props;
    const { id, suggestions, status } = this.state;
    const pane = suggest ? (
      <ul className={cx('bmap-search__suggestions', { 'bmap-search__suggestions--hidden': status === STATUS_BLUR })} onMouseDown={::this.setSuggestion}>
        {suggestions.map(item => {
          return <li className='bmap-search__suggestion' data-uid={item.uid} key={item.uid}>{item.address}</li>;
        })}
      </ul>
    ) : null;
    const els = Children.map(children, child => {
      if (child && child.type === BmapSearchInput) {
        return React.cloneElement(child, { id, ref:INPUT_REF, handleChange: pane ? ::this.fetchSuggestions : null, handleFocus: () => this.setStatus(STATUS_FOCUS), handleBlur: () => this.setStatus(STATUS_BLUR) });
      }
      return child;
    });

    return (
      <div className={cx(className, 'bmap-search')}>
        <div className='frow f-ai-c f-jc-c bmap-search__ctrl'>{els}</div>
        {pane}
      </div>
    );
  }
}

BmapSearch.Input = BmapSearchInput;

export default BmapSearch;
