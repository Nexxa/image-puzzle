/**
 * @file Vdom - render puzzle pieces using virtual-dom
 * @author StefanoMagrassi <stefano.magrassi@gmail.com>
 */

// Imports
// -------
import R from 'ramda';
import h from 'virtual-dom/h';
import diff from 'virtual-dom/diff';
import patch from 'virtual-dom/patch';
import createElement from 'virtual-dom/create-element';
import {mapWithIndex, pairs, propWithPx} from './utils';
import selectionManager from './selection.js';

// Exports
// -------
export default virtualdom;

// Constants
// ---------
/**
 * @constant {string} ELEMENT_TYPE - Puzzle piece html element type
 * @public
 */
export const ELEMENT_TYPE = 'span';
/**
 * @constant {string} CONTAINER_CLASS - Puzzle pieces container css class
 * @public
 */
export const CONTAINER_CLASS = '.img-puzzle_pieces';
/**
 * @constant {string} PIECE_CLASS - Puzzle piece css class
 * @public
 */
export const PIECE_CLASS = '.img-puzzle_pieces_piece';

/**
 * @func containerFrom - Gets the "parentNode" property from "image" element of specified data object.
 * @private
 * @curried
 * @return {HTMLElement}
 */
const containerFrom = R.path(['image', 'parentNode']);
/**
 * @func src - Gets the "src" property from "image" element of specified data object.
 * @private
 * @curried
 * @return {string}
 */
const src = R.path(['image', 'src']);

// Instance
// --------
/**
 * Creates a new virtualdom factory.
 * @public
 * @param {object} [spec={}} - Module instance specifications:<br/>
 *                      	     object = {
 *                       	     	onSelect: <Function> - callback on select; passes selection as parameter
 *                      	     }
 * @return {object}
 */
function virtualdom(spec = {}) {

  /**
   * @property {VTree} tree - Virtual tree of puzzle pieces.
   * @private
   */
  let tree;
  /**
   * @property {DOMNode} root - Real DOM element equivalent to virtual tree.
   * @private
   */
  let root;
  /**
   * @func pieceCy - Curried [piece]{@link piece} method.
   * @private
   * @curried
   * @return {Function}
   */
  const pieceCy = R.curry(piece);
  /**
   * @property {object} selection - Selection manager
   * @private
   */
  const selection = selectionManager({
    onSelect: R.prop('onSelect', spec),
    onUpdate: update
  });
  /**
   * @func selectWithIndexAnd - Curried version of selection.withIndex method.
   * @private
   * @curried
   * @return {Function}
   */
  const selectWithIndexAnd = R.curry(selection.withIndex);

  // Public API
  // ----------
  return {
    render: render,
    update: update
  };

  /**
   * Renders the virtual tree as a real DOM element.<br/>
   * Data object: {
   * 	 image: <HTMLImageElement> // Puzzle image
   * 	 rows: <Number>,           // Number of rows
   *   cols: <Number>,           // Number of columns
   *   pairs: <Array>            // Pairs of cell/item
   * }
   * @public
   * @param  {object} data - Puzzle data object
   * @return {VTree} Rendered virtual tree
   */
  function render(data) {
    tree = pieces(data);
    root = createElement(tree);

    containerFrom(data).appendChild(root);

    return tree;
  }

  /**
   * Updates the virtual tree and applies diffs to the real DOM element.
   * @public
   * @param  {object} data - Puzzle data object
   * @return {VTree} Updated virtual tree
   */
  function update(data) {
    const updatedTree = pieces(data);
    const patches     = diff(tree, updatedTree);

    root = patch(root, patches);
    tree = updatedTree;

    return tree;
  }

  // Private methods
  // ---------------
  /**
   * Creates the virtual-tree of puzzle pieces with virtual-hyperscript.
   * @private
   * @param  {object} data - Puzzle data object
   * @return {VTree} The virtual-tree of puzzle pieces
   */
  function pieces(data) {
    const asPieceWithSrc = R.compose(pieceCy, src)(data);
    const children       = R.compose(mapWithIndex(asPieceWithSrc), pairs);

    return h(CONTAINER_CLASS, { onclick: selectWithIndexAnd(data) }, children(data));
  }

  /**
   * Create the virtual-element of puzzle piece with virtual-hyperscript.
   * @private
   * @param  {string} src  - Image source
   * @param  {array}  pair - Pair of cell/item objects
   * @return {VTree} The virtual-element of puzzle piece
   */
  function piece(src, pair, index) {
    const [cell, item] = pair;

    return h(`${ELEMENT_TYPE}${PIECE_CLASS}`, {
      puzzle_index: index,
      className   : selection.toggleClass(index),
      style       : {
        width             : propWithPx('width', cell),
        height            : propWithPx('height', cell),
        backgroundImage   : `url(${src})`,
        backgroundPosition: backgroundPosition(item),
        left              : propWithPx('x', cell),
        top               : propWithPx('y', cell)
      }
    });
  }
}

/**
 * Returns the background-position property's value from item.
 * @private
 * @param  {object} item - Item object
 * @return {string} Background-position value
 */
function backgroundPosition(item) {
  return `${propWithPx('bgX', item)} ${propWithPx('bgY', item)}`;
}
