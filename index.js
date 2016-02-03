/**
 * @file Image Puzzle - puzzle game factory
 * @author StefanoMagrassi <stefano.magrassi@gmail.com>
 */

// Imports
// -------
import _partial from 'lodash/partial';
import {default as render, update} from './lib/render';

// Exports
// -------
export default imagePuzzle;

// Constants
// ---------
/**
 * @constant {number} DEFAULT_ROWS - Default number of rows
 * @public
 */
export const DEFAULT_ROWS = 3;
/**
 * @constant {number} DEFAULT_COLS - Default number of columns
 * @public
 */
export const DEFAULT_COLS = 3;

// Public methods
// --------------
function imagePuzzle(image = null, rows = DEFAULT_ROWS, cols = DEFAULT_COLS) {
  if (image === null) {
    return null;
  }

  return {
    image : image,
    rows  : rows,
    cols  : cols,
    render: _partial(render, image, rows, cols),
    update: _partial(update, image, rows, cols)
  };
}
