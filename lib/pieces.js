// Imports
// -------
// Import full library because of lack of support for "chain" method in modularized version
import _ from 'lodash';

// Exports
// -------
export default pieces;

// Public methods
// --------------
/**
 * Creates a collection of pieces.<br/>
 * Every piece has some usefull data like: index, row, col, original position, size etc..
 * @public
 * @param  {number} r - Rows number
 * @param  {number} c - Columns number
 * @param  {number} w - Piece width
 * @param  {number} h - Piece height
 * @return {array} Collection of pieces
 */
function pieces(r, c, w, h) {
  return _.chain(list(r, c))              // List of all pieces
          .chunk(c)                       // Divide in rows based on columns
          .map(rows)                      // Add row and index
          .flatten()
          .groupBy('row')
          .transform(rowsWithCols, [])    // Add col
          .flatten()
          .map(_.partial(withSize, w, h)) // Add sizes
          .map(withOriPos)                // Add original position
          .value();
}

// Private methods
// ---------------
/**
 * Gets an array of indexes from a range.<br/>
 * The range starts from 1 (constant) and ends to the total number of pieces (that is, rows * columns).
 * @private
 * @param  {number} r - Rows number
 * @param  {number} c - Columns number
 * @return {array} Array of indexes from 1 to (r * c)
 */
function list(r, c) {
  return _.range(1, (r * c) + 1); // shifted by one
}

/**
 * Maps group to build object with data (row and index).
 * @private
 * @param  {array}  group - Array of grouped indexes ("chunk")
 * @param  {number} index - Piece's index
 * @return {array} Collection of object with data
 */
function rows(group, index) {
  return _.map(group, _.partial(withRow, index + 1));
}

/**
 * Gets and object with row and index.
 * @private
 * @param  {number} row   - Row number
 * @param  {number} index - Piece's index
 * @return {object}
 */
function withRow(row, index) {
  return {
    row  : row,
    index: index
  };
}

/**
 * Adds an object with data (row, col and index) to a collection.
 * @private
 * @param  {array} result - Resulting collection (accomulator)
 * @param  {array} group  - Array of grouped piece object
 * @return {array} The collection (accomulator)
 */
function rowsWithCols(result, group) {
  result.push(cols(group));

  return result;
}

/**
 * Maps group in order to add column number.
 * @private
 * @param  {array} group - Group of piece object
 * @return {array} Collection remapped
 */
function cols(group) {
  return _.map(group, withCol);
}

/**
 * Adds column number to piece.
 * @private
 * @param  {object} piece - Piece object
 * @param  {number} index - Collection current index
 * @return {object} Piece object
 */
function withCol(piece, index) {
  piece.col = index + 1;

  return piece;
}

/**
 * Adds sizes to piece.
 * @private
 * @param  {number} w     - Piece width
 * @param  {number} h     - Piece height
 * @param  {object} piece - Piece object
 * @return {object} Piece object
 */
function withSize(w, h, piece) {
  piece.width  = w;
  piece.height = h;

  return piece;
}

/**
 * Adds original position to piece.
 * @private
 * @param  {object} piece - Piece object
 * @return {object} Piece object
 */
function withOriPos(piece) {
  piece.oriX = (piece.width * (piece.col - 1));
  piece.oriY = (piece.height * (piece.row - 1));

  return piece;
}
