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
  win   : win
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
 * @return {object}
 */
let withPairsOrRandom = R.when(R.propSatisfies(R.isNil, 'pairs'), setRandomPairs);
/**
 * #curried - Renders vdom with data.
 * @private
 * @return {object}
 */
let renderWithPairsOrRandom = R.pipe(withPairsOrRandom, last, R.tap(vdom.render));
/**
 * #curried - Updates vdom with data.
 * @private
 * @return {object}
 */
let updateWithRandom = R.pipe(setRandomPairs, last, R.tap(vdom.update));

// Private methods
// ---------------
/**
 * Shallow clones data and sets/overrides "pairs" value.
 * @private
 * @param {object} data - Data object
 * @return {object} New data object with "pairs" value changed
 */
function setRandomPairs(data) {
  return R.assoc('pairs', randomWithParams(data), data);
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
