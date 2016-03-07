/**
 * @file Collection - collection of items
 * @author StefanoMagrassi <stefano.magrassi@gmail.com>
 */

// Imports
// -------
import R from 'ramda';
import shuffle from 'shuffle-array';
import {mapWithIndex} from './utils';
import grid from './grid';

// Exports
// -------
export {sorted as default, random};

/**
 * Creates a collection of sorted cells / sorted items.
 * @public
 * @param  {object} opts - Options object: {
 *                       										 width  - Grid width
 *                       										 height - Grid height
 *                                           rows   - Rows number
 *                                           cols   - Columns number
 *                       									 }
 * @return {array} Collection of items
 */
function sorted(opts) {
  return factory(false, opts);
}

/**
 * Creates a collection of sorted cells / random items.
 * @public
 * @param  {object} opts - Options object: {
 *                       										 width  - Grid width
 *                       										 height - Grid height
 *                                           rows   - Rows number
 *                                           cols   - Columns number
 *                       									 }
 * @return {array} Random collection of items
 */
function random(opts) {
  return factory(true, opts);
}

/**
 * @func remapAsItem - Remaps collection elements as item.
 * @private
 * @curried
 * @return {Function}
 */
const remapAsItem = mapWithIndex(asItem);

/**
 * @func remapAsItemAndShuffle = Pipes remapping as item and shuffling.
 * @private
 * @curried
 * @return {function}
 */
const remapAsItemAndShuffle = R.pipe(remapAsItem, shuffle);

/**
 * @func sortedOrRandom - Uses remapAsItem or remapAsItemAndShuffle based on predicate.
 * @private
 * @curried
 * @return {Function}
 */
const sortedOrRandom = R.cond([
  [R.equals(true), remapAsItemAndShuffle],
  [R.equals(false), () => remapAsItem]
]);

/**
 * @func bgXFrom - Gets "x" property and negates it.
 * @private
 * @curried
 * @return {Function}
 */
const bgXFrom = R.compose(R.negate, R.prop('x'));

/**
 * @func bgYFrom - Gets "y" property and negates it.
 * @private
 * @curried
 * @return {Function}
 */
const bgYFrom = R.compose(R.negate, R.prop('y'));

/**
 * Returns sorted or random collection of cells/items based on parameter.
 * @private
 * @param  {boolean} [random=false] - Random items or not
 * @param  {object} opts - Options object: {
 *                       										 width  - Grid width
 *                       										 height - Grid height
 *                                           rows   - Rows number
 *                                           cols   - Columns number
 *                       									 }
 * @return {array} The collection
 */
function factory(random = false, opts) {
  const {width, height, rows, cols} = opts;
  const cells                       = grid(width, height, rows, cols);
  const zipWithCells                = R.zip(cells);
  const items                       = sortedOrRandom(random);
  const pipe                        = R.pipe(items, zipWithCells);

  return pipe(cells);
}

/**
 * Gets item object from parameters.
 * @param  {object} cell  - Cell object
 * @param  {number} index - Item index
 * @return {object} Item object
 */
function asItem(cell, index) {
  return {
    position: index,
    bgX     : bgXFrom(cell),
    bgY     : bgYFrom(cell)
  };
}
