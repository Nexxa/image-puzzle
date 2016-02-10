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

  // Private properties
  let configuration = {};
  let lastRun       = {};
  let runAndSave    = R.pipe(puzzle.run, last);
  let updateAndSave = R.pipe(puzzle.update, last);

  /**
   * Gets or sets the last puzzle data object.
   * @param  {object} data - Puzzle data object
   * @return {object} Last puzle data object
   */
  function last(data) {
    if (typeof data === 'undefined') {
      return lastRun;
    }

    lastRun = data;

    return lastRun;
  }

  /**
   * Gets or sets image puzzle configuration.
   * @param  {array} [sources=[]] - Objects to merge with configuration
   * @return {object} Configuration object
   */
  function config(sources = []) {
    if (!sources.length) {
      return configuration;
    }

    configuration = merge(R.concat([configuration], sources));

    return configuration;
  }

  /**
   * Starts Image Puzzle.
   * @return {object} Puzzle data object
   */
  function start() {
    let data = config([DEFAULTS, imageWithId(image), opts]);

    return runAndSave(data);
  }

  /**
   * Updates the puzzle pieces.
   * @public
   * @param  {object} opts - Options object
   * @return {object} Puzzle data object
   */
  function update() {
    return updateAndSave(config());
  }

  /**
   * Rebuilds the puzzle with specified rows and colums.
   * @param  {number} rows - Number of rows
   * @param  {number} cols - Number of columns
   * @return {object} Puzzle data object
   */
  function rebuild(rows, cols) {
    let data = {rows: rows, cols: cols, pairs: null};

    return updateAndSave(config([data]));
  }

  /**
   * Gets the current game state as simple object or JSON string.
   * @public
   * @param  {boolean} asString - If true gets the stringify version of state object
   * @return {[object|string]} Game state object or string -> {rows, cols, data}
   */
  function state(asString = false) {
    let stringyfied = stringyOrNot(asString);

    return R.pipe(R.omit('image'), stringyfied)(last());
  }

  // Register subscriptionthis.configuration
  game.sub(makeTheMove);

  // Public API
  return {
    _first : start(),
    config : config,
    update : update,
    state  : state,
    rebuild: rebuild
  };
}

/**
 * #curried - JSON stringifies data based on boolean parameter.
 * @return {function}
 */
let stringyOrNot = R.cond([
  [R.equals(true), () => JSON.stringify],
  [R.equals(false), () => R.identity]
]);

function imageWithId(image) {
  if (!image.id) {
    image.id = 'r_' + Math.round(Math.random() * 1000000);
  }

  return {image: image};
}

/**
 * Merges specified sources with config.
 * @private
 * @param  {array} sources - Options sources (array of objects) to merge with config
 * @return {object} New configuration object
 */
function merge(sources) {
  return R.pipe(R.reject(R.isNil), R.mergeAll)(sources);
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
