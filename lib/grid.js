/**
 * @file Grid - puzzle grid
 * @author StefanoMagrassi <stefano.magrassi@gmail.com>
 */

// Imports
// -------
// Import full library because of lack of support for "chain" method in modularized version
import _ from 'lodash';
import cell from './cell';

// Exports
// -------
export {grid as default, list};

// Public methods
// --------------
/**
 * Creates an ordered collection of pieces {@link piece}.
 * @public
 * @param  {number} rows    - Rows number
 * @param  {number} columns - Columns number
 * @param  {number} width   - Piece width
 * @param  {number} height  - Piece height
 * @return {array} Collection of pieces
*/
function grid(rows, columns, width, height) {
  let gridItems = list(rows, columns, width, height);

  return _.map(gridItems, asCellCy(width, height));
}

/**
 * Gets a collection of cells.
 * @private
 * @param  {number} rows    - Number of rows
 * @param  {number} columns - Number of columns
 * @return {array} Collection of pieces
 */
function list(rows, columns) {
  return _(indexes(rows, columns))
          .map(colsCy(columns))
          .chunk(columns) // Divide in rows based on columns
          .flatMap(colsWithRow)
          .value();
}

// Private properties
// ------------------
/**
 * @property {function} colsCy - Curried version of [cols()]{@link cols} private method.
 * @private
 */
let colsCy = _.curry(cols);
/**
 * @property {function} asCellCy-  Curried version of [asCell()]{@link asCell} private method.
 * @private
 */
let asCellCy = _.curry(asCell);

// Private methods
// ---------------
/**
 * Gets the entire list of indexes as an array.
 * @private
 * @param  {number} rows - Number of rows
 * @param  {number} cols - Number of columns
 * @return {array} Array of indexes
 */
function indexes(rows, cols) {
  return _.range(rows * cols);
}

/**
 * Gets the column from index.
 * @private
 * @param  {number} columns - Total number of columns
 * @param  {number} index   - Current index
 * @return {number} Column
 */
function cols(columns, index) {
  return (index % columns);
}

/**
 * Gets an array of [row, column] from columns on the same row.
 * @param  {array}  chunk - Array of columns on the same row
 * @param  {number} row   - Row number
 * @return {array} Array of [row, column]
 */
function colsWithRow(chunk, row) {
  return _.map(chunk, _.partial(withRowAndCol, row));
}

/**
 * Returns row and column as an array.
 * @param  {number} row    - Row number
 * @param  {number} column - Column number
 * @return {array} Row and column as array
 */
function withRowAndCol(row, column) {
  return [row, column];
}

/**
 * Gets piece object from parameters.
 * @param  {number} width     - Cell width
 * @param  {number} height    - Cell height
 * @param  {array}  rowAndCol - Row and column as array
 * @return {object} Piece object
 */
function asCell(width, height, rowAndCol) {
  let [row, column] = rowAndCol; // Better readibility

  return cell(row, column, width, height);
}
