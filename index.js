/**
 * @file Image Puzzle - puzzle game factory
 * @author StefanoMagrassi <stefano.magrassi@gmail.com>
 */

// Imports
// -------
import R from 'ramda';
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

  // Set configuration
  let configuration = config([DEFAULTS, {image: image}, opts]);

  // Public API
  return {
    _first : runWith(configuration),
    config : configuration,
    update : update,
    last   : puzzle.last,
    state  : state,
    rebuild: rebuild
  };
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

function rebuild(rows, cols) {
  puzzle.removeFrom(config().image);

  return runWith(config([{rows: rows, cols: cols, data: null}]));
}

// Private properties
// ------------------
/**
 * @property {object} config - Configuration object.
 * @private
 */
let _config = {};

// Private methods
// ---------------
/**
 * Gets or sets configuration.
 * @private
 * @param  {array} sources - Configurations to merge
 * @return {object} Configuration object
 */
function config(sources = []) {
  if (!sources.length) {
    return _config;
  }

  _config = mergeConfigWith(sources);

  return _config;
}

/**
 * Merges specified sources with config.
 * @private
 * @param  {array} sources - Options sources (array of objects) to merge with config
 * @return {object} New configuration object
 */
function mergeConfigWith(sources) {
  return R.pipe(R.reject(R.isNil), R.concat([_config]), R.mergeAll)(sources);
}

/**
 * Runs the puzzle with specified options.
 * @private
 * @param  {object} config - Configuration object
 * @return {array} Collection of cell/item pairs
 */
function runWith(config) {
  let {image, rows, cols, data} = config;

  return puzzle.run(image, rows, cols, data);
}
