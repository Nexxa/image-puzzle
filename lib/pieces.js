// Imports
// -------
// Import full library because of lack of support for "chain" method in modularized version
import _ from 'lodash';

// Exports
// -------
export {pieces, random};

// Public methods
// --------------
/**
 * Creates a collection of pieces.<br/>
 * Every piece has some usefull data like: index, row, col, position, size etc..
 * @public
 * @param  {number} rows    - Rows number
 * @param  {number} columns - Columns number
 * @param  {number} width   - Piece width
 * @param  {number} height  - Piece height
 * @return {array} Collection of pieces
 */
function pieces(rows, columns, width, height) {
  let usingAsc = list(rows, columns, width, height);

  return piecesData(usingAsc, columns);
}

/**
 * Creates a random collection of pieces.
 * @public
 * @param  {number} rows    - Rows number
 * @param  {number} columns - Columns number
 * @param  {number} width   - Piece width
 * @param  {number} height  - Piece height
 * @return {array} Collection of pieces
 */
function random(rows, columns, width, height) {
  let usingRandom = randomList(rows, columns, width, height);

  return piecesData(usingRandom, columns);
}

// Private methods
// ---------------
/**
 * Gets a collection of piece objects from indexes sorted ascending.<br/>
 * Adds to single item index and sizes.
 * @private
 * @param  {number} rows    - Rows number
 * @param  {number} columns - Columns number
 * @param  {number} width   - Piece width
 * @param  {number} height  - Piece height
 * @return {array} Collection of piece objects
 */
function list(rows, columns, width, height) {
  return _(indexes(rows, columns))
          .map(withPosition)
          .map(_.partial(withSize, width, height))
          .value();
}

/**
* Gets an array of indexes from a range.<br/>
* The range starts from 1 (constant) and ends to the total number of pieces (that is, rows * columns).
* @private
* @param  {number} r - Rows number
* @param  {number} c - Columns number
* @return {array} Array of indexes from 1 to (r * c)
*/
function indexes(r, c) {
  const START = 1;

  return _.range(START, (r * c) + 1); // shifted by one
}

/**
 * Remaps item as an object with position index.
 * @param  {number} position - The item as numbered index
 * @return {object} The item as object with index
 */
function withPosition(position) {
  return _.set({}, 'position', position);
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
  return _.merge(piece, {
    width : w,
    height: h
  });
}

/**
 * Gets a collection of piece objects from indexes sorted random.<br/>
 * Adds to single item index and sizes.
 * @private
 * @param  {number} rows    - Rows number
 * @param  {number} columns - Columns number
 * @param  {number} width   - Piece width
 * @param  {number} height  - Piece height
 * @return {array} Collection of piece objects
 */
function randomList(rows, columns, width, height) {
  let sortedAsc = list(rows, columns, width, height);

  return _(sortedAsc)
          .shuffle()
          .value();
}

/**
 * Adds data (rows, columns, position) to pieces collection.
 * @private
 * @param  {array} collection - Pieces collection
 * @param  {number} columns   - Columns number
 * @return {array} Pieces collection
 */
function piecesData(collection, columns) {
  return _(collection)
          .map(withIndex)
          .chunk(columns) // Divide in rows based on columns
          .flatMap(rows)
          .groupBy('row')
          .transform(rowsWithCols, [])
          .flatten()
          .map(withCoords)
          .value();
}

/**
 * Adds index to piece.
 * @param  {object} piece - Piece object
 * @param  {number} index - Piece index
 * @return {object} Piece object
 */
function withIndex(piece, index) {
  return _.set(piece, 'index', index + 1);
}


/**
 * Remaps grouped pieces in orderd to add row.
 * @private
 * @param  {array}  group    - Array of grouped indexes ("chunk")
 * @param  {number} rowIndex - Row index
 * @return {array} Pieces with row
 */
function rows(group, rowIndex) {
  return _.map(group, _.partial(withRow, rowIndex));
}

/**
 * Adds row to piece.
 * @private
 * @param  {number} rowIndex - Row index
 * @param  {object} piece    - Piece object
 * @return {object}
 */
function withRow(rowIndex, piece) {
  return _.set(piece, 'row', rowIndex + 1);
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
 * @param  {number} colIndex - Column index
 * @return {object} Piece object
 */
function withCol(piece, colIndex) {
  return _.set(piece, 'col', colIndex + 1);
}

/**
 * Adds coordinates to piece.
 * @private
 * @param  {object} piece - Piece object
 * @return {object} Piece object
 */
function withCoords(piece) {
  return _.merge(piece, {
    x: (piece.width * (piece.col - 1)),
    y: (piece.height * (piece.row - 1))
  });
}
