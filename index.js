/**
 * @file Image Puzzle - puzzle game factory
 * @author StefanoMagrassi <stefano.magrassi@gmail.com>
 */

// Imports
// -------
import R from 'ramda';
import puzzle from './lib/puzzle';
import game from './lib/game';

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
  pairs: null
};

// Public methods
// --------------
/**
 * Creates a new Image Puzzle object.<br/>
 * Available configuration:
 * {
 *   rows: <Number>, // Number of rows - Default 3
 *   cols: <Number>, // Number of columns - Default 3
 *   pairs: <Array>  // Data loaded from another source (localStorge, ajax etc) - Default null
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

  // Register subscription
  game.sub(makeTheMove);

  // Public API
  return {
    _first : puzzle.run(configuration),
    config : expConfig,
    update : update,
    state  : state,
    rebuild: rebuild
  };
}

/**
 * Gets config - this is an alias for public API only.
 * @public
 * @return {object} Configuration object
 */
function expConfig() {
  return config();
}

/**
 * Updates the puzzle pieces.
 * @public
 * @param  {object} opts - Options object
 * @return {object} Puzzle data object
 */
function update() {
  return puzzle.update(config());
}

/**
 * Gets the current game state as simple object or JSON string.
 * @public
 * @param  {boolean} asString - If true gets the stringify version of state object
 * @return {[object|string]} Game state object or string -> {rows, cols, data}
 */
function state(asString = false) {
  let stringify = R.cond([
    [R.equals(true), () => JSON.stringify],
    [R.equals(false), () => R.identity]
  ]);

  return R.pipe(R.omit('image'), stringify(asString))(puzzle.last());
}

/**
 * Rebuilds the puzzle with specified rows and colums.
 * @param  {number} rows - Number of rows
 * @param  {number} cols - Number of columns
 * @return {object} Puzzle data object
 */
function rebuild(rows, cols) {
  return puzzle.update(config([{rows: rows, cols: cols, pairs: null}]));
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
 * Makes the move... flipping the two puzzle pieces specified in "move" array.
 * @private
 * @param  {array} move - The move
 * @return {object} Puzzle data object
 */
function makeTheMove(move) {
  return puzzle.flip(...move, puzzle.last());
}
