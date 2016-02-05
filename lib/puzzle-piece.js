/**
 * @file Puzzle piece - methods to handle pieces
 * @author StefanoMagrassi <stefano.magrassi@gmail.com>
 */

// Imports
// -------
import dom from './dom';
import _filter from 'lodash/filter';

// Exports
// -------
export default {
  element  : element,
  addTo    : addTo,
  onCell   : onCell,
  list     : list,
  removeAll: removeAll
};

// Constants
// ---------
/**
 * @constant {string} ELEMENT_TYPE - Puzzle piece html element type
 * @public
 */
export const ELEMENT_TYPE = 'span';
/**
 * @constant {string} CSS_CLASS - Puzzle piece css class
 * @public
 */
export const CSS_CLASS = 'img-puzzle_piece';

// Public methods
// --------------
/**
 * Creates a new puzzle piece as html element.
 * @public
 * @param  {object} cell - Cell object
 * @param  {object} item - Item object
 * @param  {string} src  - Source of puzzle's image
 * @return {HTMLElement} Puzzle piece as html element
 */
function element(cell, item, src) {
  let piece = document.createElement(ELEMENT_TYPE);

  piece.className                = CSS_CLASS;
  piece.style.width              = cell.width + 'px';
  piece.style.height             = cell.height + 'px';
  piece.style.backgroundImage    = `url("${src}")`;
  piece.style.backgroundPosition = `${item.bgX}px ${item.bgY}px`;

  return piece;
}

/**
 * Moves piece on cell.
 * @public
 * @param  {HTMLElement} piece - Piece html element
 * @param  {object}      cell  - Cell object
 * @return {HTMLElement} Piece html element
 */
function onCell(piece, cell) {
  piece.style.left = cell.x + 'px';
  piece.style.top  = cell.y + 'px';

  return piece;
}

/**
* Adds puzzle piece to image.
* @public
* @param  {HTMLImageElement} image - Puzzle image element
* @param  {HTMLElement}      piece - Piece html element
* @return {HTMLElement} Piece html element
*/
function addTo(image, piece) {
  return dom.parent(image).appendChild(piece);
}

/**
 * Gets all puzzle pieces in container.
 * @public
 * @param  {HTMLElement} container - Container html element
 * @return {array} Collection of html element
 */
function list(container) {
  return _filter(dom.siblings(container), (element) => dom.hasClass(element, CSS_CLASS));
}

/**
 * Removes all puzzle pieces in container.
 * @public
 * @param  {HTMLElement} container - Container html element
 * @return {undefined}
 */
function removeAll(container) {
  return list(container).forEach(item => dom.remove(item));
}
