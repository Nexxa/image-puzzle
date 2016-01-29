// Imports
// -------
import _partial from 'lodash/partial';
import _forEach from 'lodash/forEach';
import {random} from './pieces';

// Exports
// -------
export default render;

// Public methods
// --------------
/**
 * Renders piece of image. The number of pieces is based on "rows" and "cols" parameters.
 * @public
 * @param  {HTMLImageElement} [img=null] - Html image element
 * @param  {number}           [rows=3]   - Number of rows
 * @param  {number}           [cols=3]   - Number of columns
 * @return {array} Image pieces
 */
function render(img = null, rows = 3, cols = 3) {
  if (img === null) {
    return null;
  }

  let imagePieces   = _pieces(img, rows, cols);
  let addPieceToImg = _partial(addPiece, img.parentNode);

  return _forEach(imagePieces, addPieceToImg);
}

// Private methods
// ---------------
/**
 * Gets the images pieces based on rows an columns number.
 * @private
 * @param  {HTMLImageElement} img  - HTML image element
 * @param  {number}           rows - Number of rows
 * @param  {number}           cols - Number of columns
 * @return {array} Image pieces
 */
function _pieces(img, rows, cols) {
  let imageW = img.width;
  let imageH = img.height;
  let pieceW = imageW / cols;
  let pieceH = imageH / rows;

  return random(rows, cols, pieceW, pieceH);
}

/**
 * Adds piece to container.
 * @private
 * @param {HTMLElement} container - HTML element
 * @param {object}      piece     - Piece object
 * @return {HTMLElement} Piece as HTML element
 */
function addPiece(container, piece) {
  let pieceEl = document.createElement('span');

  pieceEl.className    = 'img-puzzle_piece';
  pieceEl.innerHTML    = piece.index;
  pieceEl.style.width  = piece.width + 'px';
  pieceEl.style.height = piece.height + 'px';
  pieceEl.style.left   = piece.oriX + 'px';
  pieceEl.style.top    = piece.oriY + 'px';

  return container.appendChild(pieceEl);
}
