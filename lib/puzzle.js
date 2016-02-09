/**
 * @file Puzzle - puzzle pieces on grid cells
 * @author StefanoMagrassi <stefano.magrassi@gmail.com>
 */

// Imports
// -------
import R from 'ramda';
import {random} from './collection';
import vdom from './vdom';

// Exports
// -------
// Public API
export default {
  run   : run,
  update: update,
  last  : last,
  win   : win,
  flip  : flip
};

// Public methods
// --------------
/**
 * Renders the puzzle with specified data.
 * @public
 * @param  {object} data - Puzzle data object
 * @return {object} Last puzzle data object
 */
function run(data) {
  return renderWithPairsOrRandom(data);
}

/**
 * Updates the puzzle with specified data.
 * @param  {object} data - Puzzle data object
 * @return {object} Last puzzle data object
 */
function update(data) {
  return updateWithRandom(data);
}

/**
 * Gets or sets the last puzzle data object.
 * @public
 * @param  {object} data - Puzzle data object
 * @return {object} Last puzle data object
 */
function last(data) {
  if (typeof data === 'undefined') {
    return _last;
  }

  _last = data;

  return _last;
}

/**
 * Checks if game move (a.k.a. the specified data object) is winning.
 * @public
 * @param  {object} data - Game move data
 * @return {boolean} Is winning or not
 */
function win(data) {
  return R.pipe(
    R.prop('pairs'),
    R.map(R.nth(1)),
    R.pluck('position'),
    reduceWithIndex(positionEqualsIndex, true)
  )(data);
}

/**
 * Flips item with index "a" and item with index "b" in data object pairs.
 * @param  {object} data - Puzzle data object
 * @param  {number} a    - Index of item "a"
 * @param  {number} b    - Index of item "b"
 * @return {object} Puzzle data object
 */
function flip(a, b, data) {
  return updateWithFlipped(a, b, data);
}

// Private properties
// ------------------
/**
* @property {object} _last - Last puzzle data.
* @private
*/
let _last = {};
/**
 * #curried - Add index to R.reduce function.
 * @private
 * @return {function}
 */
let reduceWithIndex = R.addIndex(R.reduce);
/**
 * #curried - Gets random pairs with params taken from object.
 * @private
 * @return {function}
 */
let randomWithParams = R.compose(random, withParamsFrom);
/**
 * #curried - Returns random pairs when "pairs" property in data object is null
 * @private
 * @return {function}
 */
let withPairsOrRandom = R.when(R.propSatisfies(R.isNil, 'pairs'), randomPairs);
/**
 * #curried - Renders vdom with data.
 * @private
 * @return {function}
 */
let renderWithPairsOrRandom = R.pipe(withPairsOrRandom, last, R.tap(vdom.render));
/**
 * #curried - Saves last operation and updates vdom with data.
 * @private
 * @return {function}
 */
let saveAndUpdate = R.pipe(last, R.tap(vdom.update));
/**
 * #curried - Updates vdom with random pairs.
 * @private
 * @return {function}
 */
let updateWithRandom = R.pipe(randomPairs, saveAndUpdate);
/**
 * #curried - Updates vdom with flipped pairs.
 * @private
 * @return {function}
 */
let updateWithFlipped = R.pipe(flippedPairs, saveAndUpdate);

// Private methods
// ---------------
/**
 * Shallow clones data and sets/overrides "pairs" value.
 * @private
 * @param {object} data - Data object
 * @return {object} New data object with "pairs" value changed
 */
function randomPairs(data) {
  return pairsInData(randomWithParams(data), data);
}

/**
 * Sets or overrides pairs in data.
 * @param  {array}  pairs - Collection of cells/items pairs
 * @param  {object} data  - Puzzle data object
 * @return {object} Puzzle data object
 */
function pairsInData(pairs, data) {
  return R.assoc('pairs', pairs, data);
}

/**
 * Flips item with index "a" and item with index "b" in data object pairs.
 * @param  {number} a    - Index of item "a"
 * @param  {number} b    - Index of item "b"
 * @param  {object} data - Puzzle data object
 * @return {object} Puzzle data object
 */
function flippedPairs(a, b, data) {
  let pairs     = R.prop('pairs', data);
  let cells     = R.map(R.nth(0), pairs);
  let items     = R.map(R.nth(1), pairs);
  let twoInA    = R.pipe(R.remove(a, 1), R.compose(R.insert(a), R.nth(b))(items));
  let oneInB    = R.pipe(R.remove(b, 1), R.compose(R.insert(b), R.nth(a))(items));
  let withCells = R.zip(cells);
  let flipped   = R.pipe(twoInA, oneInB, withCells)(items);

  return pairsInData(flipped, data);
}

/**
 * Prepares parameters for colletion.
 * @private
 * @param  {HTMLImageElement} image - Image html element
 * @param  {number}           rows  - Rows number
 * @param  {number}           cols  - Columns number
 * @return {object} Parameters for collection
 */
function withParamsFrom(data) {
  let w = R.path(['image', 'width'], data);
  let h = R.path(['image', 'height'], data);

  return R.pipe(R.pick(['rows', 'cols']), R.assoc('width', w), R.assoc('height', h))(data);
}

/**
 * Checks if specified position is equal to index.
 * @private
 * @param  {boolean} accumulator - Previous value
 * @param  {number} position     - Position number
 * @param  {number} index        - Index
 * @return {boolean}
 */
function positionEqualsIndex(accumulator, position, index) {
  return (accumulator && position === index);
}
