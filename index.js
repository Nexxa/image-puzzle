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

  return start({
    image: image,
    rows : rows,
    cols : cols
  });
}

// Private methods
// ---------------
/**
 * Creates a new image puzzle object with specified options.
 * @param  {object} opts - Options object
 * @return {object} Image puzzle object
 */
function start(opts) {
  return {
    run   : run(opts),
    update: update(opts),
    last  : puzzle.last
  };
}

/**
 * Runs the puzzle with specified options.
 * @param  {object} opts - Options object
 * @return {function} Partially applied run function
 */
function run(opts) {
  let {image, rows, cols} = opts;

  return _partial(puzzle.run, image, rows, cols);
}

/**
 * Updates the puzzle pieces.
 * @param  {object} opts - Options object
 * @return {function} Partially applied update function
 */
function update(opts) {
  let {image, rows, cols} = opts;

  return _partial(puzzle.update, image, rows, cols);
}
