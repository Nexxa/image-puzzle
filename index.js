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
 * @constant {object} DEFAULTS - Default configurations
 * @public
 */
export const DEFAULTS = {
  image: null,
  rows : 3,
  cols : 3,
  data : null
};

// Public methods
// --------------
/**
 * Creates a new Image Puzzle object.<br/>
 * Available configuration:
 * {
 *   rows: <Number>, // Number of rows - Default 3
 *   cols: <Number>, // Number of columns - Default 3
 *   data: <Array>,  // Data loaded from another source (localStorge, ajax etc) - Default null
 * }
 *
 * @public
 * @param  {HTMLImageElement} [image=null] - Image html element
 * @param  {object}           opts         - Configuration
 * @return {object} Image Puzzle object
 */
function imagePuzzle(image = null, opts) {
  if (image === null) {
    return null;
  }

  return start(config(DEFAULTS, {image: image}, opts));
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

/**
 * Gets the current game state as simple object or JSON string.
 * @private
 * @param  {boolean} asString - If true gets the stringify version of state object
 * @return {[object|string]} Game state object or string -> {rows, cols, data}
 */
function state(asString = false) {
  let {rows, cols} = config();
  let current      = {
    rows: rows,
    cols: cols,
    data: puzzle.last()
  };

  if (asString) {
    return JSON.stringify(current);
  }

  return current;
}

// Private properties
// ------------------
/**
 * @property {object} config - Default configuration.
 * @private
 */
let _config = {};

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
    _first : run(opts),
    config : config(),
    update : update,
    last   : puzzle.last,
    state  : state
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
