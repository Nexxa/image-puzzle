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
 * @property {function} mapWithIndex - Map with index in callback - #curried.
 * @public
 */
export let mapWithIndex = R.addIndex(R.map);
/**
 * @property {function} reduceWithIndex - Add index to R.reduce function - #curried.
 * @public
 */
export let reduceWithIndex = R.addIndex(R.reduce);
/**
 * @property {function} pairs - Gets the "pairs" property of specified data object - #curried.
 * @public
 */
export let pairs = R.prop('pairs');
/**
 * @property {function} containedIn - Flips parameters of R.contains method - #curried.
 * @public
 * @return {function}
 */
export let containedIn = R.flip(R.contains);
/**
 * @property {function} rangeFrom0 - Range from 0 - #curried
 * @public
 */
export let rangeFrom0 = R.range(0);

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

// Private methods
// ---------------
/**
 * @property {function} addPx - Adds leading "px" string to passed string - #curried.
 * @private
 */
let addPx = R.pipe(R.toString, R.flip(R.concat)('px'));
