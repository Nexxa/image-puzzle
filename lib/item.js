/**
 * @file Piece - piece's data as object
 * @author StefanoMagrassi <stefano.magrassi@gmail.com>
 */

// Imports
// -------
import {x, y} from './cell';

// Exports
// -------
export {item as default, bgX, bgY};

// Constants
// ---------
/**
 * @constant {object} KEYS - Piece object keys.
 * @public
 */
export const KEYS = {
  POSITION: 'position',
  ROW     : 'row',
  COL     : 'col',
  WIDTH   : 'width',
  HEIGHT  : 'height',
  BGX     : 'bgX',
  BGY     : 'bgY'
};

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
  let data = {};

  data[KEYS.POSITION] = index;
  data[KEYS.ROW]      = row;
  data[KEYS.COL]      = col;
  data[KEYS.WIDTH]    = width;
  data[KEYS.HEIGHT]   = height;
  data[KEYS.BGX]      = bgX(width, col);
  data[KEYS.BGY]      = bgY(height, row);

  return data;
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
