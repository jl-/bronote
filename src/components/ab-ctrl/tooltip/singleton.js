import React, { Component } from 'react';
import './style.scss';

const TOOLTIP_ACTIVE_CLS = 'tp--active';

let $tooltip = null;
function makeTooltip(content) {
  let tooltipInner;
  if (!$tooltip) {
    $tooltip = document.createElement('div');
    tooltipInner = $tooltip.cloneNode();
    $tooltip.appendChild(tooltipInner);
    $tooltip.setAttribute('class', 'tp');
    tooltipInner.setAttribute('class', 'tp-inner');
  } else {
    tooltipInner = $tooltip.firstElementChild;
  }

  $tooltip.classList.remove(TOOLTIP_ACTIVE_CLS);
  tooltipInner.innerHTML = content;
  return $tooltip;
}

function findElementUpFromTarget(target, test) {
  while (target) {
    if (test(target)) return target;
    target = target.parentElement;
  }
  return null;
}
function getTooltipData(target) {
  if (!target) return null;
  const content = target.getAttribute('data-tooltip');
  if (!content) return null;
  const align = target.getAttribute('data-tooltip-align');
  return { content, align };
}
function findTooltipTarget(target) {
  return findElementUpFromTarget(target, getTooltipData);
}
function isTooltipShown(target) {
  return $tooltip && $tooltip.classList.contains(TOOLTIP_ACTIVE_CLS);
}
function hideTooltip() {
  if (!isTooltipShown()) return;
  $tooltip.remove();
  $tooltip.classList.remove(TOOLTIP_ACTIVE_CLS);
}
function showTooltipForTarget(target) {
  const tooltipData = getTooltipData(target);
  const content = tooltipData && tooltipData.content;
  if (!target || !content || isTooltipShown(target)) return;

  const align = tooltipData.align;
  const tooltip = makeTooltip(content);

  target.insertAdjacentElement('afterend', tooltip);
  const { left, top } = computeTooltipStyle(target, tooltip, align);

  tooltip.style.left = left;
  tooltip.style.top = top;
  tooltip.classList.add(TOOLTIP_ACTIVE_CLS);
}

function isLeftValid(left, popupWidth, winScrollLeft, winWidth) {
  return (left >= winScrollLeft) && (left + popupWidth <= winScrollLeft + winWidth);
}
function isTopValid(top, popupHeight, winScrollTop, winHeight) {
  return (top >= winScrollTop) && (top + popupHeight <= winScrollTop + winHeight);
}
function mapLeftAndTopForStyle(left, top) {
  return { left: `${left}px`, top: `${top}px` };
}
function computeTooltipStyle(target, tooltip, align) {
  const {
    offsetWidth: targetWidth,
    offsetHeight: targetHeight,
    offsetLeft: targetOffsetLeft,
    offsetTop: targetOffsetTop,
  } = target;
  const { offsetWidth: tooltipWidth, offsetHeight: tooltipHeight } = tooltip;
  const { innerWidth: winWidth, innerHeight: winHeight } = window;
  const { scrollLeft: winScrollLeft, scrollTop: winScrollTop } = document.body;

  const baseLeft = targetOffsetLeft, baseTop = targetOffsetTop;

  const leftForVerticalCenter = baseLeft + (targetWidth - tooltipWidth) / 2;
  const topForHorizontalCenter = baseTop + (targetHeight - tooltipHeight) / 2;
  const leftForToLeft = baseLeft - tooltipWidth;
  const leftForToRight = baseLeft + targetWidth;
  const topForToBottom = baseTop + targetHeight;
  const topForToTop = baseTop - tooltipHeight;

  if (align === 'bc') {
    return mapLeftAndTopForStyle(leftForVerticalCenter, topForToBottom);
  } else if (align === 'tc') {
    return mapLeftAndTopForStyle(leftForVerticalCenter, topForToTop);
  } else if (align === 'lc') {
    return mapLeftAndTopForStyle(leftForToLeft, topForHorizontalCenter);
  } else if (align === 'rc') {
    return mapLeftAndTopForStyle(leftForToRight, topForHorizontalCenter);
  }

  const pos = [
    //  _
    // |_|____
    // |______| : (baseLeft, topForToBottom)
    baseLeft, topForToBottom,
    //  _
    // | |_
    // | |_|    : (leftForToLeft, topForHorizontalCenter)
    // |_|
    //
    leftForToLeft, topForHorizontalCenter,
    //    _
    //  _| |
    // |_| |    : (leftForToRight, topForHorizontalCenter)
    //   |_|
    //
    leftForToRight, topForHorizontalCenter,
    //    __
    //  _|__|_
    // |______| : (leftForVerticalCenter, topForToBottom)
    //
    leftForVerticalCenter, topForToBottom,
    //  ______
    // |______|
    //   |__|   : (leftForVerticalCenter, topForToTop)
    //
    leftForVerticalCenter, topForToTop,
  ];
  for (let index = pos.length - 1; index > 0; index -= 2) {
    const isPosVisible = isTopValid(pos[index], tooltipHeight, winScrollTop, winHeight)
      && isLeftValid(pos[index - 1], tooltipWidth, winScrollLeft, winWidth);
    if (isPosVisible) return mapLeftAndTopForStyle(pos[index - 1], pos[index]);
  }

  return mapLeftAndTopForStyle(leftForVerticalCenter, topForToBottom);
}


class Tooltip extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleMouseOver = ::this.handleMouseOver;
  }
  componentDidMount() {
    document.addEventListener('mouseover', this.handleMouseOver);
  }
  componentWillUnmount() {
    document.removeEventListener('mouseover', this.handleMouseOver);
  }
  handleMouseOver(e) {
    const { target, relatedTarget } = e;
    const fromTarget = findTooltipTarget(relatedTarget);
    const toTarget = findTooltipTarget(target);
    if (fromTarget !== toTarget || (!fromTarget && !toTarget)) {
      hideTooltip();
    }
    showTooltipForTarget(toTarget);
  }
  render() {
    return null;
  }
}

export default Tooltip;
