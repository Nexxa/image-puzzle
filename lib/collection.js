/**
 * @file Collection - collection of items
 * @author StefanoMagrassi <stefano.magrassi@gmail.com>
 */

// Imports
// -------
import _map from 'lodash/map';
import _shuffle from 'lodash/shuffle';
import _zip from 'lodash/zip';
import grid from './grid';

// Exports
// -------
export {collection as default, random};

// Public methods
// --------------
/**
 * Creates a collection of ordered cells / ordered items.
 * @public
 * @param  {number} width   - Grid width
 * @param  {number} height  - Grid height
 * @param  {number} rows    - Rows number
 * @param  {number} columns - Columns number
 * @return {array} Collection of items
 */
function collection(width, height, rows, columns) {
  return factory(width, height, rows, columns);
}

/**
 * Creates a collection of ordered cells / random items.
 * @public
 * @param  {number} width   - Grid width
 * @param  {number} height  - Grid height
 * @param  {number} rows    - Rows number
 * @param  {number} columns - Columns number
 * @return {array} Random collection of items
 */
function random(width, height, rows, columns) {
  return factory(width, height, rows, columns, true);
}

// Private methods
// ---------------
/**
 * Returns ordered or random collection of cells/items based on parameter.
 * @param  {number} width           - Grid width
 * @param  {number} height          - Grid height
 * @param  {number} rows            - Rows number
 * @param  {number} columns         - Columns number
 * @param  {boolean} [random=false] - Random items or not
 * @return {array} The collection
 */
function factory(width, height, rows, columns, random = false) {
  let cells = grid(width, height, rows, columns);
  let items = _map(cells, asItem);

  if (random) {
    items = _shuffle(items);
  }

  return _zip(cells, items);
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
