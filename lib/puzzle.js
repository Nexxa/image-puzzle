/**
 * @file Render - puzzle pieces on grid cells
 * @author StefanoMagrassi <stefano.magrassi@gmail.com>
 */

// Imports
// -------
import R from 'ramda';
import shuffle from 'shuffle-array';
import grid from './grid';
import {random} from './collection';
import puzzlePiece from './puzzle-piece';

// Exports
// -------
export default {
  run       : run,
  update    : update,
  last      : last,
  removeFrom: puzzlePiece.removeAll
};

// Public methods
// --------------
/**
 * Renders piece of image. The number of pieces is based on "rows" and "cols" parameters.
 * @public
 * @param  {HTMLImageElement} image       - Image as html element
 * @param  {number}           rows        - Number of rows
 * @param  {number}           cols        - Number of columns
 * @param  {[array|null]}     [data=null] - Data from other source
 * @return {array} Collection or cell/item pairs
 */
function run(image, rows, cols, data = null) {
  let pairs = data || random(params(image, rows, cols));

  return R.forEach(addPieceOn(image), last(pairs));
}

/**
 * Update the puzzle pieces position randomly.
 * @param  {HTMLImageElement} image - Image as html element
 * @param  {number}           rows  - Number of rows
 * @param  {number}           cols  - Number of columns
 * @return {array} Collection or cell/item pairs
 */
function update(image, rows, cols) {
  let cells  = grid(image.width, image.height, rows, cols);
  let pieces = shuffle(puzzlePiece.list(image));

  return R.forEach(refreshPieceUsing(pieces), cells);
}

/**
 * Gets or sets the last pairs collection.
 * @public
 * @param  {array} pairs - Collection of cell/item pairs
 * @return {[array]} Last pairs collection
 */
function last(pairs) {
  if (typeof pairs === 'undefined') {
    return lastRun;
  }

  lastRun = pairs;

  return lastRun;
}

// Private properties
// ------------------
/**
* @property {array} lastRun - Last computed pairs collectio.
* @private
*/
let lastRun = [];
/**
* @property {function} addPieceOn - Curried version of [addPiece]{@link addPiece} method.
* @private
*/
let addPieceOn = R.curry(addPiece);
/**
* @property {function} refreshPieceUsing - Curried version of [refreshPiece]{@link refreshPiece} method.
* @private
*/
let refreshPieceUsing = R.curry(refreshPiece);

// Private methods
// ---------------
/**
 * Prepares parameters for colletion.
 * @param  {HTMLImageElement} image - Image html element
 * @param  {number}           rows  - Rows number
 * @param  {number}           cols  - Columns number
 * @return {object} Parameters for collection
 */
function params(image, rows, cols) {
  return {
    width : image.width,
    height: image.height,
    rows  : rows,
    cols  : cols
  };
}

/**
 * Adds piece to container.
 * @private
 * @param  {HTMLImageElement} image - HTML Image element
 * @param  {array}            pair  - Pair of cell / item
 * @return {HTMLElement} Item as HTML element
 */
function addPiece(image, pair) {
  let [cell, item] = pair;
  let piece        = puzzlePiece.element(cell, item, image.src);
  let onCell       = puzzlePiece.onCell(piece, cell);

  return puzzlePiece.addTo(image, onCell);
}

/**
 * Refresh piece position.
 * @private
 * @param  {array}  pieces - Collection of pieces
 * @param  {object} cell   - Cell object
 * @param  {number} index  - Cell index
 * @return {HTMLElement} Puzzle piece html element
 */
function refreshPiece(pieces, cell, index) {
  return puzzlePiece.onCell(pieces[index], cell);
}
