/**
 * @file Collection - creation of collection of items
 * @author StefanoMagrassi <stefano.magrassi@gmail.com>
 */

// Imports
// -------
// Import full library because of lack of support for "chain" method in modularized version
import _ from 'lodash';
import item from './item';
import {list} from './grid';

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
  let collectionList = list(rows, columns, width, height);

  return _.map(collectionList, asItemCy(width, height));
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
  let randomList = list(rows, columns, width, height);

  return _(randomList)
          .map(asItemCy(width, height))
          .shuffle()
          .value();
}

// Private properties
// ------------------
/**
 * @property {function} asItemCy-  Curried version of [asItem()]{@link asItem} private method.
 * @private
 */
let asItemCy = _.curry(asItem);

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
