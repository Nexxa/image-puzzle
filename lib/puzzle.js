/**
 * @file Render - puzzle pieces on grid cells
 * @author StefanoMagrassi <stefano.magrassi@gmail.com>
 */

// Imports
// -------
import _curry from 'lodash/curry';
import _forEach from 'lodash/forEach';
import _shuffle from 'lodash/shuffle';
import grid from './grid';
import {random} from './collection';
import puzzlePiece from './puzzle-piece';

// Exports
// -------
export default {
  run   : run,
  update: update
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
  let pairs = data || random(image.width, image.height, rows, cols);

  return _forEach(pairs, addPieceOn(image));
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
  let pieces = _shuffle(puzzlePiece.list(image));

  return _forEach(cells, refreshPieceUsing(pieces));
}

// Private methods
// ---------------
/**
 * @property {function} addPieceOn - Curried version of [addPiece]{@link addPiece} method.
 * @private
 */
let addPieceOn = _curry(addPiece);
/**
 * @property {function} refreshPieceUsing - Curried version of [refreshPiece]{@link refreshPiece} method.
 * @private
 */
let refreshPieceUsing = _curry(refreshPiece);

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
