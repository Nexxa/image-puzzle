/**
 * @file Grid - puzzle grid
 * @author StefanoMagrassi <stefano.magrassi@gmail.com>
 */

// Imports
// -------
import R from 'ramda';
import {rangeFrom0} from './utils';
import cell from './cell';

// Exports
// -------
export default grid;

// Public methods
// --------------
/**
 * Gets a collection of cells.
 * @private
 * @param  {number} width   - Grid width
 * @param  {number} height  - Grid height
 * @param  {number} rows    - Number of rows
 * @param  {number} columns - Number of columns
 * @return {array} Collection of pieces
 */
function grid(width, height, rows, columns) {
  let cellW   = width / columns;
  let cellH   = height / rows;
  let cols    = R.map(R.flip(R.modulo)(columns));
  let chunks  = R.splitEvery(columns);
  let addRows = flatMap(colsWithRow);
  let cells   = R.map(asCellWith(cellW, cellH));

  return R.pipe(
          rangeFrom0,
          cols,
          chunks,
          addRows,
          cells
        )(rows * columns);
}

// Private properties
// ------------------
/**
 * @property {function} asCellWith - Curried version of [asCell]{@link asCell} method
 * @private
 */
let asCellWith = R.curry(asCell);

// Private methods
// ---------------
/**
 * Emulates flatMap.
 * @param  {function} fn - Mapping function
 * @return {function} Curried map() with index
 */
function flatMap(fn) {
  return R.addIndex(R.chain)(fn);
}

/**
 * Gets an array of [row, column] from columns on the same row.
 * @param  {array}  chunk - Array of columns on the same row
 * @param  {number} row   - Row number
 * @return {array} Array of [row, column]
 */
function colsWithRow(chunk, row) {
  return R.map(R.pair(row), chunk);
}

/**
 * Gets the cell object.
 * @param  {number} width     - Cell width
 * @param  {number} height    - Cell height
 * @param  {array}  rowAndCol - Array with cell row and column
 * @return {object} Cell object
 */
function asCell(width, height, rowAndCol) {
  let [row, col] = rowAndCol;

  return cell(width, height, row, col);
}
