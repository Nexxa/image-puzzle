// Imports
// -------
import _partial from 'lodash/partial';
import _forEach from 'lodash/forEach';
import {KEYS as CELL_KEYS} from './cell';
import {KEYS as ITEM_KEYS} from './item';
import grid from './grid';
import {random} from './collection';

// Exports
// -------
export default render;

// Constants
// ---------
/**
 * @constant {string} PIECE_ELEMENT_TYPE - Puzzle piece html element type
 * @public
 */
export const PIECE_ELEMENT_TYPE = 'span';
/**
 * @constant {string} PIECE_CSS_CLASS - Puzzle piece css class
 * @public
 */
export const PIECE_CSS_CLASS = 'img-puzzle_piece';

// Public methods
// --------------
/**
 * Renders piece of image. The number of pieces is based on "rows" and "cols" parameters.
 * @public
 * @param  {HTMLImageElement} [img=null]   - Html image element
 * @param  {number}           [rows=3]     - Number of rows
 * @param  {number}           [cols=3]     - Number of columns
 * @param  {[array|null]}     [items=null] - Items get from other source
 * @return {array} Image pieces
 */
function render(img = null, rows = 3, cols = 3, items = null) {
  if (img === null) {
    return null;
  }

  let width         = img.width / cols;
  let height        = img.height / rows;
  let cells         = grid(rows, cols, width, height);
  let addPieceToImg = _partial(addPiece, img, cells);

  items = items || random(rows, cols, width, height);

  return _forEach(items, addPieceToImg);
}

// Private methods
// ---------------
/**
 * Adds piece to container.
 * @private
 * @param  {HTMLImageElement} image - HTML Image element
 * @param  {array}            cells - Cells grid
 * @param  {object}           item  - Item object
 * @param  {number}           index - Item index
 * @return {HTMLElement} Item as HTML element
 */
function addPiece(image, cells, item, index) {
  let _piece  = piece(PIECE_ELEMENT_TYPE, item, image.src, PIECE_CSS_CLASS);
  let _onCell = pieceOnCell(cells[index], _piece);

  return image.parentNode.appendChild(_onCell);
}

/**
 * Creates a new puzzle piece as html element.
 * @param  {string} type     - Piece html element type
 * @param  {object} item     - Item object with piece data
 * @param  {string} src      - Source of puzzle's image
 * @param  {string} cssClass - Piece css class
 * @return {HTMLElement} Puzzle piece as html element
 */
function piece(type, item, src, cssClass) {
  let element = document.createElement(type);

  element.className                = cssClass;
  element.style.width              = item[ITEM_KEYS.WIDTH] + 'px';
  element.style.height             = item[ITEM_KEYS.HEIGHT] + 'px';
  element.style.backgroundImage    = `url("${src}")`;
  element.style.backgroundPosition = `${item[ITEM_KEYS.BGX]}px ${item[ITEM_KEYS.BGY]}px`;

  return element;
}

/**
 * Moves piece on cell.
 * @param  {object}      cell   - Cell object
 * @param  {HTMLElement} itemEl - Piece html element
 * @return {HTMLElement} Piece html element
 */
function pieceOnCell(cell, piece) {
  piece.style.left = cell[CELL_KEYS.X] + 'px';
  piece.style.top  = cell[CELL_KEYS.Y] + 'px';

  return piece;
}
