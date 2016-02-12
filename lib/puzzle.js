/**
 * @file Puzzle - puzzle pieces on grid cells
 * @author StefanoMagrassi <stefano.magrassi@gmail.com>
 */

// Imports
// -------
import R from 'ramda';
import {reduceWithIndex, pairs} from './utils';
import {random} from './collection';

// Exports
// -------
export default {
  run   : run,
  update: update,
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
  return withPairsOrRandom(data);
}

/**
 * Updates the puzzle with specified data.
 * @param  {object} data - Puzzle data object
 * @return {object} Last puzzle data object
 */
function update(data) {
  return randomPairs(data);
}

/**
 * Checks if game move (a.k.a. the specified data object) is winning.
 * @public
 * @param  {object} data - Game move data
 * @return {boolean} Is winning or not
 */
function win(data) {
  return R.pipe(
    pairs,
    R.map(R.nth(1)),
    R.pluck('position'),
    sorted
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
  let cells     = R.map(R.nth(0), pairs(data));
  let items     = R.map(R.nth(1), pairs(data));
  let twoInA    = R.pipe(R.remove(a, 1), R.compose(R.insert(a), R.nth(b))(items));
  let oneInB    = R.pipe(R.remove(b, 1), R.compose(R.insert(b), R.nth(a))(items));
  let withCells = R.zip(cells);
  let flipped   = R.pipe(twoInA, oneInB, withCells)(items);

  return pairsInData(flipped, data);
}

// Private properties
// ------------------
/**
 * @property {function} randomWithParams - Gets random pairs with params taken from object - #curried.
 * @private
 */
let randomWithParams = R.compose(random, withParamsFrom);
/**
 * @property {function} withPairsOrRandom - Random pairs when "pairs" property in data object is null - #curried.
 * @private
 */
let withPairsOrRandom = R.when(R.propSatisfies(R.isNil, 'pairs'), randomPairs);
/**
 * @property {function} sorted - Checks if indexes in collection are sorted - #curried.
 * @private
 */
let sorted = reduceWithIndex(equalsIndex, true);

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
function equalsIndex(accumulator, position, index) {
  return (accumulator && position === index);
}
