/**
 * @file Item - puzzle piece data
 * @author StefanoMagrassi <stefano.magrassi@gmail.com>
 */

// Exports
// -------
export default item;

// Public methods
// --------------
/**
 * Gets an item object.
 * @public
 * @param  {number} index  - Item index
 * @param  {number} row    - Item row
 * @param  {number} col    - Item column
 * @param  {number} width  - Item width
 * @param  {number} height - Item height
 * @return {object} Item object
 */
function item(index, row, col, width, height) {
  return {
    position: index,
    row     : row,
    col     : col,
    width   : width,
    height  : height,
    x       : x(width, col),
    y       : y(height, row),
    bgX     : bgX(width, col),
    bgY     : bgY(height, row)
  };
}

// Private methods
// ---------------
/**
 * Gets "x" coordinate based on width and column.
 * @public
 * @param  {number} width - Item width
 * @param  {number} col   - Item column
 * @return {number} Item "x" coordinate
 */
function x(width, col) {
  return (width * col);
}

/**
 * Gets "y" coordinate based on height and row.
 * @public
 * @param  {number} height - Item height
 * @param  {number} row    - Item row
 * @return {number} Item "y" coordinate
 */
function y(height, row) {
  return (height * row);
}


/**
 * Gets background "x"-position based on width and column.
 * @private
 * @param  {number} width - Item width
 * @param  {number} col   - Item column
 * @return {number} Item background "x"-position
 */
function bgX(width, col) {
  return -(x(width, col));
}

/**
 * Gets background "y"-position based on height and row.
 * @private
 * @param  {number} height - Item height
 * @param  {number} row    - Item row
 * @return {number} Item background "y"-position
 */
function bgY(height, row) {
  return -(y(height, row));
}
