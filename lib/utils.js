/**
 * @file Utilities
 * @author StefanoMagrassi <stefano.magrassi@gmail.com>
 */

// Imports
// -------
import R from 'ramda';

// Public methods
// --------------
/**
 * @func mapWithIndex - Map with index in callback.
 * @public
 * @curried
 * @return {Function}
 */
export const mapWithIndex = R.addIndex(R.map);

/**
 * @func reduceWithIndex - Add index to R.reduce function.
 * @public
 * @curried
 * @return {Function}
 */
export const reduceWithIndex = R.addIndex(R.reduce);

/**
 * @func pairs - Gets the "pairs" property of specified data object.
 * @public
 * @curried
 * @return {Function}
 */
export const pairs = R.prop('pairs');

/**
 * @func containedIn - Flips parameters of R.contains method.
 * @public
 * @curried
 * @return {Function}
 * @return {function}
 */
export const containedIn = R.flip(R.contains);

/**
 * @func rangeFrom0 - Range from 0
 * @public
 * @curried
 * @return {Function}
 */
export const rangeFrom0 = R.range(0);

/**
 * @func addPx - Adds leading "px" string to passed string.
 * @private
 * @curried
 * @return {Function}
 */
const addPx = R.pipe(R.toString, R.flip(R.concat)('px'));

/**
 * Takes the property's value from object and gets with leading 'px' string.
 * @public
 * @param  {string} name - Property's name
 * @param  {object} obj  - Source object
 * @return {string} Property's value with leading 'px' string
 */
export function propWithPx(name, obj) {
  return R.compose(addPx, R.prop(name))(obj);
}
