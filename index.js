/**
 * @file Image Puzzle - puzzle game factory
 * @author StefanoMagrassi <stefano.magrassi@gmail.com>
 */

// Imports
// -------
import _partial from 'lodash/partial';
import puzzle from './lib/puzzle';

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
    run   : run(image, rows, cols),
    update: update(image, rows, cols)
  };
}

// Private methods
// ---------------
function run(image, rows, cols) {
  return _partial(puzzle.run, image, rows, cols);
}

function update(image, rows, cols) {
  return _partial(puzzle.update, image, rows, cols);
}
