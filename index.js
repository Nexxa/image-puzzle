// Imports
// -------
import _partial from 'lodash/partial';
import pieces from './lib/pieces';

let image = document.getElementById('img-puzzle_img');

function render(img, rows, cols) {
  let imageW = img.width;
  let imageH = img.height;
  let pieceW = imageW / cols;
  let pieceH = imageH / rows;

  return pieces(rows, cols, pieceW, pieceH)
          .forEach(_partial(addPiece, img.parentNode));
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
