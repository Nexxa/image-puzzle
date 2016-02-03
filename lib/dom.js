/**
 * @file Dom - dom utilities
 * @author StefanoMagrassi <stefano.magrassi@gmail.com>
 */

// Imports
// -------
import _filter from 'lodash/filter';
import _includes from 'lodash/includes';

// Exports
// -------
export default {
  parent  : parent,
  siblings: siblings,
  hasClass: hasClass
};

// Public methods
// --------------
/**
 * Gets element's parent.
 * @param  {HTMLElement} [element=null] - Element
 * @return {[HTMLElement|null]} Parent
 */
function parent(element = null) {
  if (element === null) {
    return null;
  }

  return element.parentNode;
}

/**
 * Gets siblings elements of element as array.
 * @param  {HTMLElement} element - Element
 * @return {array} Array of siblings (a.k.a.: with same parent node) HTMLElements
 */
function siblings(element) {
  return _filter(parent(element).childNodes, (node) => node.nodeType === Node.ELEMENT_NODE);
}

/**
 * Checks if element has class.
 * @param  {HTMLElement} element   - Element
 * @param  {string}      className - Css class
 * @return {boolean} Element has class or not
 */
function hasClass(element, className) {
  return _includes(element.className.split(' '), className);
}
