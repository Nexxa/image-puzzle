/**
 * @file Collection - collection of items
 * @author StefanoMagrassi <stefano.magrassi@gmail.com>
 */

// Imports
// -------
import R from 'ramda';
import shuffle from 'shuffle-array';
import grid from './grid';

// Exports
// -------
export {sorted as default, random};

// Public methods
// --------------
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

// Private properties
// ------------------
/**
 * @property (function) remapAsItem - Remaps collection elements as item.
 * @private
 */
let remapAsItem = R.addIndex(R.map)(asItem);

/**
 * @property (function) sortedOrRandom - Uses remapAsItem or remapAsItemAndShuffle based on predicate.
 * @private
 */
let sortedOrRandom = R.cond([
  [R.equals(true), remapAsItemAndShuffle],
  [R.equals(false), () => remapAsItem]
]);

// Private methods
// ---------------
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
  let {width, height, rows, cols} = opts;
  let cells                       = grid(width, height, rows, cols);
  let zipWithCells                = R.zip(cells);
  let items                       = sortedOrRandom(random);
  let pipe                        = R.pipe(items, zipWithCells);

  return pipe(cells);
}

/**
 * Pipes remapping as item and shuffling.
 * @return {function} Remap and shuffle pipe
 */
function remapAsItemAndShuffle() {
  return R.pipe(remapAsItem, shuffle);
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
    bgX     : -(cell.x),
    bgY     : -(cell.y)
  };
}
