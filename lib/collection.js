/**
 * @file Collection - collection of items
 * @author StefanoMagrassi <stefano.magrassi@gmail.com>
 */

// Imports
// -------
import _map from 'lodash/map';
import _shuffle from 'lodash/shuffle';
import _curry from 'lodash/curry';
import item from './item';
import grid from './grid';

// Exports
// -------
export {collection as default, random};

// Public methods
// --------------
/**
 * Creates an ordered collection of items {@link item}.
 * @public
 * @param  {number} rows    - Rows number
 * @param  {number} columns - Columns number
 * @param  {number} width   - Item width
 * @param  {number} height  - Item height
 * @return {array} Collection of items
 */
function collection(rows, columns, width, height) {
  let sortedGrid = grid(rows, columns);

  return _map(sortedGrid, asItemCy(width, height));
}

/**
 * Creates a random collection of items {@link item}.
 * @public
 * @param  {number} rows    - Rows number
 * @param  {number} columns - Columns number
 * @param  {number} width   - Item width
 * @param  {number} height  - Item height
 * @return {array} Collection of items
 */
function random(rows, columns, width, height) {
  let sortedCollection = collection(rows, columns, width, height);

  return _shuffle(sortedCollection);
}

// Private properties
// ------------------
/**
 * @property {function} asItemCy - Curried version of [asItem()]{@link asItem} private method.
 * @private
 */
let asItemCy = _curry(asItem);

// Private methods
// ---------------
/**
 * Gets item object from parameters.
 * @param  {number} width     - Item width
 * @param  {number} height    - Item height
 * @param  {array}  rowAndCol - Row and column as array
 * @param  {number} index     - Item index
 * @return {object} Item object
 */
function asItem(width, height, rowAndCol, index) {
  let [row, column] = rowAndCol; // Better readibility

  return item(index, row, column, width, height);
}
