import { toCss } from '../utils/data';

export default function stylerUi({ color = '#ffffff', main = '#1B5E20', input = { color: '#33333' } } = {}) {
  const el = document.createElement('style');
  document.head.appendChild(el);
  let css = '';
  css += toCss('.ui-price', {
    background: input.background || '#ececec',
    'border-color': input.border || main,
  });
  css += toCss('.ui-price input', {
    color: input.color || color || '#333333',
  });
  css += toCss('.ui-price span', {
    color: input.color || color,
  });
  css += toCss('.ui-input', {
    background: input.background || '#ececec',
    'border-color': input.border || main,
  });
  css += toCss('.ui-input input', {
    color: input.color || color || '#333333',
  });
  css += toCss('.ui-checkbox__check', {
    'border-color': input.border || main,
  });
  css += toCss('.ui-checkbox.is-active .ui-checkbox__check', {
    background: input.border || main,
    color: color || '#ffffff',
  });
  css += toCss('.ui-btn', {
    background: main,
    color: color || '#ffffff',
  });
  css += toCss('.ui-loading__path', {
    stroke: main,
  });
  el.innerHTML = css;
}
