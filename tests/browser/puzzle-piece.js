/**
 * @file Puzzle-piece module - tests
 * @author StefanoMagrassi <stefano.magrassi@gmail.com>
 */

// Imports
// -------
import test from 'tape';
import puzzlePiece from '../../lib/puzzle-piece';
import {ELEMENT_TYPE, CSS_CLASS} from '../../lib/puzzle-piece';

// Constants
// ---------
const IMAGE_PATH = 'http://i.telegraph.co.uk/multimedia/archive/02792/mountCook2_2792612b.jpg';

// Tests
// -----
test('element() returns a new puzzle piece as html element', function(t) {
  let cell   = {row: 0, col: 0, width: 100, height: 100, x: 0, y: 0};
  let item   = {position: 0, bgX: 0, bgY: 0};
  let piece  = puzzlePiece.element(cell, item, IMAGE_PATH);

  let expect = (piece.nodeName.toLowerCase() === ELEMENT_TYPE && piece.className === CSS_CLASS);

  t.ok(expect, 'should return an html element');
  t.end();
});

test('onCell() moves a puzzle piece on a cell', function(t) {
  let cell   = {row: 0, col: 0, width: 100, height: 100, x: 0, y: 0};
  let item   = {position: 0, bgX: 0, bgY: 0};
  let piece  = puzzlePiece.element(cell, item, IMAGE_PATH);
  let moved  = puzzlePiece.onCell(piece, cell);

  let actual = [parseFloat(moved.style.left), parseFloat(moved.style.top)];
  let expect = [cell.x, cell.y];

  t.deepEqual(actual, expect, 'puzzle piece (x, y) should be equal to cell (x, y)');
  t.end();
});

test('addTo() adds a puzzle piece to image', function(t) {
  t.plan(1);

  testImage(function() {
    let image  = this;
    let cell   = {row: 0, col: 0, width: 100, height: 100, x: 0, y: 0};
    let item   = {position: 0, bgX: 0, bgY: 0};
    let piece  = puzzlePiece.element(cell, item, image.src);
    let moved  = puzzlePiece.onCell(piece, cell);
    let added  = puzzlePiece.addTo(image, moved);

    let actual = added.parentNode;
    let expect = image;

    t.deepEqual(actual, expect, 'puzzle piece should be a child of image');
  });

  t.timeoutAfter(10 * 1000);
});

test('list() returns the puzzle piece elements in container', function(t) {
  t.plan(1);

  testImage(function() {
    let image = this;
    let pairs = [
      [{row: 0, col: 0, width: 100, height: 100, x: 0, y: 0},{row: 0, col: 1, width: 100, height: 100, x: 100, y: 0}],
      [{position: 0, bgX: 0, bgY: 0}, {position: 0, bgX: -100, bgY: 0}]
    ];

    pairs.forEach(function(pair) {
      let [cell, item] = pair;
      let piece        = puzzlePiece.element(cell, item, image.src);
      let moved        = puzzlePiece.onCell(piece, cell);

      return puzzlePiece.addTo(image, moved);
    });

    let actual = puzzlePiece.list(image).length;
    let expect = pairs.length;

    t.equal(actual, expect, 'list of puzzle piece should be equal to items');
  });

  t.timeoutAfter(10 * 1000);
});

// Private methods
// ---------------
/**
 * Creates the image on which run the tests.
 * @private
 * @param  {function} cb - Callback on image load
 * @return {undefined}
 */
function testImage(cb) {
  let container = document.body.appendChild(document.createElement('div'));
  let image     = document.createElement('img');
  image.src     = IMAGE_PATH;
  image.onload  = cb;

  return container.appendChild(image);
}