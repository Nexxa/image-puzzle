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
  let asCellWithSize = _.partial(asCell, cellW, cellH);
  let asCols         = _.partial(cols, columns);

  return _(indexes(rows, columns))
          .map(asCols)
          .chunk(columns) // Divide in rows based on columns
          .flatMap(colsWithRow)
          .map(asCellWithSize)
          .value();
}

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
