/**
 * @file Image Puzzle - puzzle game factory
 * @author StefanoMagrassi <stefano.magrassi@gmail.com>
 */

// Imports
// -------
import R from 'ramda';
import {showEl, hideEl} from './lib/utils';
import puzzle from './lib/puzzle';
import virtualdom from './lib/virtualdom';

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

/**
 * @func stringyOrNot - JSON stringifies data based on boolean parameter.
 * @private
 * @curried
 * @return {Function}
 */
const stringyOrNot = R.cond([
  [R.equals(true), () => JSON.stringify],
  [R.equals(false), () => R.identity]
]);

/**
 * @func merge - Merges specified sources.
 * @private
 * @curried
 * @return {Function}
 */
const merge = R.pipe(R.reject(R.isNil), R.mergeAll);

/**
 * @func tapFnOrIdentity - Taps function or R.identity if function is undefined.
 * @private
 * @curried
 * @return {Function}
 */
const tapFnOrIdentity = R.compose(R.tap, R.defaultTo(R.identity));

// Instance
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
 * @param  {HTMLImageElement} [image=null]   - Image html element
 * @param  {object}           [opts]         - Configuration
 * @param  {function}         [onResolution] - Callback on puzzle resolution
 * @return {object} Image Puzzle object
 */
function imagePuzzle(image = null, opts, onResolution) {
  if (image === null) {
    return null;
  }

  /**
   * @property {object} configuration - Holds instance configuration.
   * @private
   */
  let configuration = {};
  /**
   * @property {object} lastRun - Holds the last puzzle data object.
   * @private
   */
  let lastRun = {};

  /**
  * @property {object} vdom - Instance of virtualdom.
  * @private
  */
  const vdom = virtualdom({ onSelect: makeTheMove });

  /**
   * @func runResolutionOnWin - Checks pieces sequence and if it is winning calls onResolution callback.
   * @private
   * @curried
   * @return {Function}
   */
  const runResolutionOnWin = R.when(puzzle.win, tapFnOrIdentity(onResolution));

  /**
   * @func runAndSave - Runs the puzzle with, saves last and renders the virtualdom
   * @private
   * @curried
   * @return {Function}
   */
  const runAndSave = R.pipe(puzzle.run, last, R.tap(vdom.render));

  /**
   * @func updateAndSave - Updates the puzzle with data, saves last and updates the virtualdom
   * @private
   * @curried
   * @return {Function}
   */
  const updateAndSave = R.pipe(puzzle.update, last, R.tap(vdom.update), runResolutionOnWin);

  /**
   * @func flipAndSave - Flips two pieces, saves last and updates the virtualdom
   * @private
   * @curried
   * @return {Function}
   */
  const flipAndSave = R.pipe(puzzle.flip, last, R.tap(vdom.update), runResolutionOnWin);

  // Public API
  // ----------
  return {
    _first : start(image, opts),
    config,
    update,
    state,
    rebuild,
    show,
    hide
  };

  /**
   * Gets or sets image puzzle configuration.
   * @public
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
   * Updates the puzzle pieces.
   * @public
   * @return {object} Puzzle data object
   */
  function update() {
    return updateAndSave(config());
  }

  /**
   * Gets the current game state as simple object or JSON string.
   * @public
   * @param  {boolean} [asString=false] - If true gets the stringify version of state object
   * @return {[object|string]} Game state object or string -> {rows, cols, data}
   */
  function state(asString = false) {
    const stringyfied = stringyOrNot(asString);

    return R.pipe(R.omit('image'), stringyfied)(last());
  }

  /**
   * Rebuilds the puzzle with specified rows and colums.
   * @public
   * @param  {number} rows - Number of rows
   * @param  {number} cols - Number of columns
   * @return {object} Puzzle data object
   */
  function rebuild(rows, cols) {
    const data = { rows: rows, cols: cols, pairs: null };

    return updateAndSave(config([data]));
  }

  /**
   * Shows image
   * @public
   * @return {HTMLImageElement} Image element
   */
  function show() {
    return showEl(image);
  }

  /**
   * Hides image
   * @private
   * @return {HTMLImageElement} Image element
   */
  function hide() {
    return hideEl(image);
  }

  /**
   * Gets or sets the last puzzle data object.
   * @private
   * @param  {object} data - Puzzle data object
   * @return {object} Last puzle data object
   */
  function last(data) {
    if (typeof data === 'undefined') {
      return lastRun;
    }

    return lastRun = data;
  }

  /**
   * Starts Image Puzzle.
   * @private
   * @return {object} Puzzle data object
   */
  function start(image, opts) {
    const data = config([DEFAULTS, { image: hideEl(image) }, opts]);

    return runAndSave(data);
  }

  /**
   * Makes the move... flipping the two puzzle pieces specified in "move" array.
   * @private
   * @param  {array} move - The move
   * @return {object} Puzzle data object
   */
  function makeTheMove(move) {
    return flipAndSave(...move, last());
  }
}
