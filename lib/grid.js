/**
 * @file Grid - puzzle grid
 * @author StefanoMagrassi <stefano.magrassi@gmail.com>
 */

// Imports
// -------
// Import full library because of lack of support for "chain" method in modularized version
//import _ from 'lodash';
//import _flow from 'lodash/flow';
//import _partial from 'lodash/partial';
//import _range from 'lodash/range';
//import _map from 'lodash/map';
//import _chunk from 'lodash/chunk';
//import _flatMap from 'lodash/flatMap';
import R from 'ramda';
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
  let cellW          = width / columns;
  let cellH          = height / rows;

  let indexes = R.range(0);
  let cols    = R.map(R.flip(R.modulo)(columns));
  let chunks  = R.splitEvery(columns);
  let addRows = flatMap(colsWithRow);
  let cells   = R.map(asCellCy(cellW, cellH));

  return R.pipe(
          //R.range(0),
          indexes,
          //R.map(R.flip(R.modulo)(columns)),
          cols,
          //R.splitEvery(columns),
          chunks,
          //R.addIndex(R.chain)(colsWithRow),
          addRows,
          //R.map(asCellWithSize)
          cells
        )(rows * columns);
}

// Private properties
// ------------------
let asCellCy = R.curry(asCell);

// Private methods
// ---------------
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
