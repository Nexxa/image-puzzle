/**
 * @file Selection - handles selection state
 * @author StefanoMagrassi <stefano.magrassi@gmail.com>
 */

// Imports
// -------
import R from 'ramda';
import {containedIn} from './utils';

// Exports
// -------
export default selectionManager;

// Constants
// ---------
export const SELECTED_CLASS = 'is-selected';
export const EMPTY          = '';
export const ONSELECT       = 'onSelect';
export const ONUPDATE       = 'onUpdate';
export const PUZZLE_INDEX   = 'puzzle_index';

/**
 * @func onSelectFrom - Returns onSelect property from object or R.identity.
 * @private
 * @curried
 * @return {Function}
 */
const onSelectFrom = R.pipe(R.prop(ONSELECT), R.when(R.isNil, () => R.identity));
/**
 * @func onUpdateFrom - Returns onUpdate property from object or R.identity.
 * @private
 * @curried
 * @return {Function}
 */
const onUpdateFrom = R.pipe(R.prop(ONUPDATE), R.when(R.isNil, () => R.identity));
/**
 * @func targetIndex - Gets target.puzzle_index path from object.
 * @private
 * @curried
 * @return {Function}
 */
const targetIndex = R.path(['target', PUZZLE_INDEX]);

// Factory
// --------
/**
 * Creates a new selection factory.
 * @public
 * @param {object} [spec={}} - Module instance specifications:<br/>
 *                      	     object = {
 *                       	     	onSelect: <Function> - callback on selection is fulfilled; passes selection as param
 *                       	     	onUpdate: <Function> - callback on update
 *                      	     }
 * @return {object}
 */
function selectionManager(spec = {}) {

  // Private properties
  // ------------------
  /**
   * @property {array} selection - Selection state
   * @private
   */
  let selection = [];
  /**
   * @func onSelect - onSelect function from specifications or R.identity.
   * @private
   * @curried
   * @return {Function}
   */
  const onSelect = onSelectFrom(spec);
  /**
   * @func onUpdate - onUpdate function from specifications or R.identity.
   * @private
   * @curried
   * @return {Function}
   */
  const onUpdate = onUpdateFrom(spec);
  /**
   * @func cleanSelection - Empties selection and run onUpdate.
   * @private
   * @curried
   * @return {Function}
   */
  const cleanSelection = R.pipe(R.tap(emptiesSelection), onUpdate);
  /**
   * @func toggleClass - Returns selected css class or empty string.
   * @private
   * @curried
   * @return {Function}
   */
  const toggleClass = R.ifElse(inSelection, R.always(SELECTED_CLASS), R.always(EMPTY));

  // Public API
  // ----------
  return {
    toggleClass,
    withIndex
  };

  // Public methods
  // --------------
  /**
   * Pushes target index to selection.
   * @public
   * @param  {object} event - Event object
   * @return {array} Selection state
   */
  function withIndex(data, event) {
    return R.ifElse(
      inSelection,
      () => cleanSelection(data),
      i  => updateSelection(i, data)
    )(targetIndex(event));
  }

  // Private methods
  // ---------------
  /**
   * Checks if index is contained in selection.
   * @private
   * @param  {number} index - Index
   * @return {boolean}
   */
  function inSelection(index) {
    return containedIn(selection, index);
  }

  /**
   * Calls "onSelect" callback with selection as parameter.
   * @private
   * @return {object} Data
   */
  function onSelectWithSelected() {
    return onSelect(selection);
  }

  /**
   * Calls "onSelect" callback with selection as parameter and cleans selection.
   * @private
   * @param  {object} data - Index
   * @return {Vtree}
   */
  function selectAndClean(data) {
    return R.pipe(onSelectWithSelected, cleanSelection)(data);
  }

  /**
   * Updates selection.
   * @private
   * @param  {number} index - Index
   * @param  {object} data  - Data
   * @return {object} Data
   */
  function updateSelection(index, data) {
    const total = selection.push(index);

    onUpdate(data);

    if (total === 2) {
      return selectAndClean(data);
    }

    return data;
  }

  /**
   * Empties selection state.
   * @return {array} Selection state
   */
  function emptiesSelection() {
    return selection = [];
  }
}
