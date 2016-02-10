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
import observe from 'observe';

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

// Instance
// --------
/**
 * Creates a new virtualdom factory.
 * @public
 * @param {object} spec - Module instance specifications:<br/>
 *                      	object = {
 *                       		onSelect: <Function> - callback function on flip; passed selected indexes as array
 *                      	}
 * @return {object}
 */
function virtualdom(spec) {

  // Private properties
  // ------------------
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
   * @property {Observe} selection - Selection state
   * @private
   */
  let selection = selectionState(spec);

  // Public API
  // ----------
  return {
    render: render,
    update: update
  };

  // Public methods
  // --------------
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
    let updatedTree = pieces(data);
    let patches     = diff(tree, updatedTree);

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
    let asPieceWithSrc = R.compose(pieceCy, src)(data);
    let children       = R.compose(mapWithIndex(asPieceWithSrc), pairs);

    return h(CONTAINER_CLASS, { onclick: selectWithIndex }, children(data));
  }

  /**
   * Pushes target index to selection observer.
   * @param  {object} event - Event object
   * @return {Observe} Selection observer
   */
  function selectWithIndex(event) {
    return selection.push(targetIndex(event));
  }
}

// Module private methods
// ----------------------
/**
 * Creates a new observer and manages selection on change.
 * @param  {object} spec - Specifications object
 * @return {Observe} Selection observer
 */
function selectionState(spec) {
  let state               = observe([]);
  let manageSelectionWith = R.curry(manageSelection);

  return state.on('change', manageSelectionWith(spec, state));
}

/**
 * Manages selection.
 * @param  {object}  spec  - Specifications object
 * @param  {Observe} state - Observer
 * @param  {object}  event - Event object
 * @return {Observe} Observer
 */
function manageSelection(spec, state, event) {
  if (isNotAdded(event) || isIncomplete(state)) {
    return;
  }

  if (R.equals(first(state), last(state))) {
    return state.splice(0);
  }

  if (R.has('onSelect', spec)) {
    R.prop('onSelect', spec)(subject(state));
  }

  return state.splice(0);
}

/**
 * Create the virtual-element of puzzle piece with virtual-hyperscript.
 * @private
 * @param  {string} src  - Image source
 * @param  {array}  pair - Pair of cell/item objects
 * @return {VTree} The virtual-element of puzzle piece
 */
function piece(src, pair, index) {
  let [cell, item] = pair;

  return h(`${ELEMENT_TYPE}${PIECE_CLASS}`, {
    puzzle_index: index,
    style: {
      width             : width(cell),
      height            : height(cell),
      backgroundImage   : `url("${src}")`,
      backgroundPosition: backgroundPosition(item),
      left              : x(cell),
      top               : y(cell)
    }
  });
}

/**
 * Takes the property's value from object and gets with leading 'px' string.
 * @private
 * @param  {string} name - Property's name
 * @param  {object} obj  - Source object
 * @return {string} Property's value with leading 'px' string
 */
function propWithPx(name, obj) {
  return R.compose(addPx, R.prop(name))(obj);
}

/**
 * Returns the background-position property's value from item.
 * @private
 * @param  {object} item - Item object
 * @return {string} Background-position value
 */
function backgroundPosition(item) {
  return `${bgX(item)} ${bgY(item)}`;
}

// Module private properties
// -------------------------
/**
 * #curried - Gets subject.
 * @private
 * @return {function}
 */
let subject = R.prop('subject');
/**
 * #curried - Checks if "type" property is not equals to "added".
 * @private
 * @return {function}
 */
let isNotAdded = R.compose(R.not, R.propEq('type', 'added'));
/**
 * #curried - Checks if subject length is lesse than 2.
 * @private
 * @return {function}
 */
let isIncomplete = R.compose(R.flip(R.lt)(2), R.length, subject);
/**
 * #curried - Gets first item from subject.
 * @private
 * @return {function}
 */
let first = R.compose(R.head, subject);
/**
 * #curried - Gets last item from subject
 * @private
 * @return {function}
 */
let last = R.compose(R.last, subject);
/**
 * #curried - Map with index in callback.
 * @private
 * @return {function}
 */
let mapWithIndex = R.addIndex(R.map);
/**
 * #curried - Gets target.puzzle_index path from object.
 * @private
 * @return {function}
 */
let targetIndex = R.path(['target', 'puzzle_index']);
/**
 * #curried - Gets the "parentNode" property from "image" element of specified data object.
 * @private
 * @return {HTMLElement}
 */
let containerFrom = R.path(['image', 'parentNode']);
/**
 * #curried - Gets the "src" property from "image" element of specified data object.
 * @private
 * @return {string}
 */
let src = R.path(['image', 'src']);
/**
 * #curried - Gets the "pairs" property of specified data object.
 * @private
 * @return {array}
 */
let pairs = R.prop('pairs');
/**
 * #curried - Curried [piece]{@link piece} method.
 * @private
 * @return {function}
 */
let pieceCy = R.curry(piece);
/**
 * #curried - Curried [propWithPx]{@link propWithPx} method.
 * @private
 * @return {function}
 */
let propWithPxCy = R.curry(propWithPx);
/**
 * #curried - Adds leading "px" string to passed string.
 * @private
 * @return {string}
 */
let addPx = R.pipe(R.toString, R.flip(R.concat)('px'));
/**
 * #curried - Gets the "width" property with leading "px" string of specified data object.
 * @private
 * @return {string}
 */
let width = propWithPxCy('width');
/**
 * #curried - Gets the "height" property with leading "px" string of specified data object.
 * @private
 * @return {string}
 */
let height = propWithPxCy('height');
/**
 * #curried - Gets the "x" property with leading "px" string of specified data object.
 * @private
 * @return {string}
 */
let x = propWithPxCy('x');
/**
 * #curried - Gets the "y" property with leading "px" string of specified data object.
 * @private
 * @return {string}
 */
let y = propWithPxCy('y');
/**
 * #curried - Gets the "bgX" property with leading "px" string of specified data object.
 * @private
 * @return {string}
 */
let bgX = propWithPxCy('bgX');
/**
 * #curried - Gets the "bgY" property with leading "px" string of specified data object.
 * @private
 * @return {string}
 */
let bgY = propWithPxCy('bgY');
