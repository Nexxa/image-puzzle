/**
 * @file Cell - cell grid data
 * @author StefanoMagrassi <stefano.magrassi@gmail.com>
 */

// Exports
// -------
export default cell;

// Public methods
// --------------
/**
 * Gets an cell object.
 * @public
 * @param  {number} width  - Cell width
 * @param  {number} height - Cell height
 * @param  {number} row    - Cell row
 * @param  {number} col    - Cell column
 * @return {object} Cell object
 */
function cell(width, height, row, col) {
  return {
    row   : row,
    col   : col,
    width : width,
    height: height,
    x     : x(width, col),
    y     : y(height, row)
  };
}

// Private methods
// ---------------
/**
 * Gets "x" coordinate based on width and column.
 * @public
 * @param  {number} width - Cell width
 * @param  {number} col   - Cell column
 * @return {number} Cell "x" coordinate
 */
function x(width, col) {
  return (width * col);
}

/**
 * Gets "y" coordinate based on height and row.
 * @public
 * @param  {number} height - Cell height
 * @param  {number} row    - Cell row
 * @return {number} Cell "y" coordinate
 */
function y(height, row) {
  return (height * row);
}
