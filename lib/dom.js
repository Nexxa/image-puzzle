/**
 * @file Dom - dom utilities
 * @author StefanoMagrassi <stefano.magrassi@gmail.com>
 */

// Imports
// -------
import R from 'ramda';

// Exports
// -------
export default {
  parent  : parent,
  siblings: siblings,
  hasClass: hasClass,
  remove  : remove
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
  return R.filter(R.propEq('nodeType', Node.ELEMENT_NODE), parent(element).childNodes);
}

/**
 * Checks if element has class.
 * @param  {HTMLElement} element   - Element
 * @param  {string}      className - Css class
 * @return {boolean} Element has class or not
 */
function hasClass(element, className) {
  return R.contains(className, element.className.split(' '));
}

/**
 * Removes element.
 * @param  {HTMLElement} element - Element
 * @return {boolean} True if element has parent and it was removed; false otherwise
 */
function remove(element) {
  if (element.parentNode) {
    element.parentNode.removeChild(element);

    return true;
  }


  return false;
}
