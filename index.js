// Imports
// -------
import _ from 'lodash';

let image = document.getElementById('img-puzzle_img');

function render(img, rows, cols) {
  let imageW = img.width;
  let imageH = img.height;
  let pieceW = imageW / cols;
  let pieceH = imageH / rows;

  return pieces(rows, cols, pieceW, pieceH)
          .forEach(_.partial(addPiece, img.parentNode));
}

function pieces(r, c, w, h) {
  return _.chain(list(r, c)) // List of all pieces
          .chunk(c) // Divide in rows based on columns
          .map(rows) // Add row and index
          .flatten()
          .groupBy('row')
          .transform(rowsWithCols, []) // Add col
          .flatten()
          .map(_.partial(withSize, w, h)) // Add sizes
          .map(withOriPos) // Add original position
          .value();
}

function list(r, c) {
  return _.range(1, (r * c) + 1); // shifted by one
}

function rows(item, index) {
  return _.map(item, _.partial(withRow, index + 1));
}

function withRow(r, index) {
  return {
    row: r,
    index: index
  };
}

function rowsWithCols(result, group) {
  result.push(cols(group));

  return result;
}

function cols(item) {
  return _.map(item, withCol);
}

function withCol(item, index) {
  item.col = index + 1;

  return item;
}

function withSize(w, h, item) {
  item.width = w;
  item.height = h;

  return item;
}

function withOriPos(item) {
  item.oriX = (item.width * (item.col - 1));
  item.oriY = (item.height * (item.row - 1));

  return item;
}

//console.log(pieces(r, c, pieceW, pieceH));

function addPiece(container, item) {
  let piece = document.createElement('span');
  piece.className = 'img-puzzle_piece';
  piece.innerHTML = item.index;
  piece.style.width = item.width + 'px';
  piece.style.height = item.height + 'px';
  piece.style.left = item.oriX + 'px';
  piece.style.top = item.oriY + 'px';

  container.appendChild(piece);
}

render(image, 3, 3);
