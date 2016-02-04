/**
 * @file Image Puzzle - puzzle game factory
 * @author StefanoMagrassi <stefano.magrassi@gmail.com>
 */

// Imports
// -------
import _extend from 'lodash/extend';
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
/**
 * Creates a new Image Puzzle object.
 * @public
 * @param  {HTMLImageElement} [image=null] - Image html element
 * @param  {object}           opts         - Configuration
 * @return {object} Image Puzzle object
 */
function imagePuzzle(image = null, opts) {
  if (image === null) {
    return null;
  }

  return start(config({image: image}, opts));
}

/**
 * Updates the puzzle pieces.
 * @public
 * @param  {object} opts - Options object
 * @return {function} Partially applied update function
 */
function update() {
  let {image, rows, cols} = config();

  return puzzle.update(image, rows, cols);
}

// Private properties
// ------------------
/**
 * @property {object} config - Default configuration.
 * @private
 */
let _config = {
  image: null,
  rows : DEFAULT_ROWS,
  cols : DEFAULT_COLS,
  data : null
};

// Private methods
// ---------------
/**
 * Gets or sets configuration.
 * @private
 * @param  {[...object]} ...sources - Configurations to merge
 * @return {object} Configuration object
 */
function config(...sources) {
  if (!sources.length) {
    return _config;
  }

  return _extend(_config, ...sources);
}

/**
 * Creates a new image puzzle object with specified options.
 * @private
 * @param  {object} opts - Options object
 * @return {object} Image puzzle object
 */
function start(opts) {
  return {
    _first: run(opts),
    config: config(),
    update: update,
    last  : puzzle.last
  };
}

/**
 * Runs the puzzle with specified options.
 * @private
 * @param  {object} opts - Options object
 * @return {function} Partially applied run function
 */
function run() {
  let {image, rows, cols, data} = config();

  return puzzle.run(image, rows, cols, data);
}
