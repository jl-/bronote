/**
 * <Pagination
 *   total={100}
 *   current={8}
 *   adjacent={2}?
 *   tail={2}?
 *   onPageChange={func}
 * />
 */
import React, { Component } from 'react';
import cx from 'classnames';
import styles from './style.scss';

const DEFAULT_ADJACENT = 3;
const DEFAULT_TAIL = 1;
const HAS_MORE = 2;
const MORE_INDICATOR = '...';
const PREVIOUS = <i className='fa fa-angle-left'></i>;
const NEXT = <i className='fa fa-angle-right'></i>;
const WRAPPER_REF = Symbol('pagination');
const CNS = 'flat-pagination';

class Pagination extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleClick = ::this.handleClick;
  }
  sanitize({
      total, current, adjacent = DEFAULT_ADJACENT, tail = DEFAULT_TAIL,
      prev = PREVIOUS, next = NEXT, ...props}) {
    return { total, current, adjacent, tail, prev, next, ...props };
  }
  generatePaginationInfo({ total, current, adjacent, tail }) {
    const pages = [current];
    let front = current, end = current;

    for (let c = adjacent; c > 0; c--) {
      (front > 1) && pages.unshift(--front);
      (end < total) && pages.push(++end);
    }

    const frontHasMore = front - tail - 1 >= HAS_MORE;
    const endHasMore = total - tail - end >= HAS_MORE;

    frontHasMore && pages.unshift(MORE_INDICATOR);
    endHasMore && pages.push(MORE_INDICATOR);

    for (let index = frontHasMore ? tail : front - 1; index > 0; index--) pages.unshift(index);
    for (let index = (endHasMore ? total - tail : end) + 1; index <= total; index++) pages.push(index);

    return { prev: current > 1, pages, next: current < total };
  }
  handleClick(e, callback) {
    let target = e.target;
    const wrapper = this.refs[WRAPPER_REF];
    if (target === wrapper) return;
    while (target.parentElement !== wrapper) target = target.parentElement;
    const index = Array.prototype.indexOf.call(wrapper.children, target);
    const page = +target.getAttribute('data-page');
    const { current, total } = this.props;
    const changed = page && page !== current && page >= 1 && page <= total;
    if (changed) return callback(page, current);
  }
  render() {
    const { total, current, adjacent, tail, prev, next, onPageChange, ...props } = this.sanitize(this.props);
    if (!(total > 1)) return null;
    const info = this.generatePaginationInfo({ total, current, adjacent, tail });
    const pages = info.pages.map((page, index) => {
      const className = cx({
        [`${CNS}__item--current`]: page === current,
        [`${CNS}__item--more`]: page === MORE_INDICATOR
      }, `${CNS}__item`);
      return (
        <li key={page === MORE_INDICATOR ? page + index : page} className={className} data-page={page}>{page}</li>
      );
    });
    const handleClick = typeof onPageChange === 'function' ? (e) => this.handleClick(e, onPageChange) : null;
    props.className = cx(props.className, `${CNS} list list--row list--flat ta--center`);
    return (
      <ul {...props} onClick={handleClick} ref={WRAPPER_REF}>
        <li className={cx(`${CNS}__prev`, { [`${CNS}__prev--disabled`]: !info.prev })} data-page={current - 1}>{prev}</li>
        {pages}
        <li className={cx(`${CNS}__next`, { [`${CNS}__next--disabled`]: !info.next })} data-page={current + 1}>{next}</li>
      </ul>
    );
  }
}

export default Pagination;
