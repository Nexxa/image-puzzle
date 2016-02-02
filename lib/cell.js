/**
 * @file Cell - grid cell data
 * @author StefanoMagrassi <stefano.magrassi@gmail.com>
 */

// Exports
// -------
export {cell as default, x, y};

// Constants
// ---------
/**
 * @constant {object} KEYS - Piece object keys.
 * @public
 */
export const KEYS = {
  ROW   : 'row',
  COL   : 'col',
  WIDTH : 'width',
  HEIGHT: 'height',
  X     : 'x',
  Y     : 'y'
};

// Public methods
// --------------
/**
 * Gets a piece object.
 * @public
 * @param  {number} row    - Piece row
 * @param  {number} col    - Piece column
 * @param  {number} width  - Piece width
 * @param  {number} height - Piece height
 * @return {object} Piece object
 */
function cell(row, col, width, height) {
  let item = {};

  item[KEYS.ROW]    = row;
  item[KEYS.COL]    = col;
  item[KEYS.WIDTH]  = width;
  item[KEYS.HEIGHT] = height;
  item[KEYS.X]      = x(width, col);
  item[KEYS.Y]      = y(height, row);

  return item;
}

/**
 * Gets "x" coordinate based on width and column.
 * @public
 * @param  {number} width - Piece width
 * @param  {number} col   - Piece column
 * @return {number} Piece "x" coordinate
 */
function x(width, col) {
  return (width * col);
}

/**
 * Gets "y" coordinate based on height and row.
 * @public
 * @param  {number} height - Piece height
 * @param  {number} row    - Piece row
 * @return {number} Piece "y" coordinate
 */
function y(height, row) {
  return (height * row);
}
