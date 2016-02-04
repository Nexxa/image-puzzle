/**
 * @file Image Puzzle - tests
 * @author StefanoMagrassi <stefano.magrassi@gmail.com>
 */

// Imports
// -------
import test from 'tape';
import imagePuzzle from '../../index';

// Constants
// ---------
const IMAGE_ID   = 'img-puzzle_img';
const IMAGE_PATH = 'http://i.telegraph.co.uk/multimedia/archive/02792/mountCook2_2792612b.jpg';

// Tests
// -----
test('imagePuzzle() returns a new Image Puzzle object', function(t) {
  t.plan(2);

  testImage(IMAGE_ID, function() {
    let image = this;
    let puzzle = imagePuzzle(image);
    let actual = puzzle.config;
    let expect = {image: image, rows: 3, cols: 3, data: null};

    t.ok(puzzle, 'should not have errors');
    t.deepEqual(actual, expect, 'should use default configurations');
  });

  t.timeoutAfter(10 * 1000);
});

test('imagePuzzle() with specified configuration', function(t) {
  t.plan(1);

  testImage(IMAGE_ID, function() {
    let image  = this;
    let data   = [
      [{row:0, col:0, width:100, height:100, x:0, y:0},{position:0, bgX:0, bgY:0}],
      [{row:0, col:1, width:100, height:100, x:100, y:0},{position:1, bgX:-100, bgY:0}],
      [{row:1, col:0, width:100, height:100, x:0, y:-100},{position:2, bgX:0, bgY:-100}],
      [{row:1, col:1, width:100, height:100, x:-100, y:-100},{position:3, bgX:-100, bgY:-100}]
    ];
    let config = {rows: 2, cols: 2, data: data};
    let puzzle = imagePuzzle(image, config);
    let actual = puzzle.config;
    let expect = {image: image, rows: config.rows, cols: config.cols, data: config.data};

    t.deepEqual(actual, expect, 'should use specified configuration');
  });

  t.timeoutAfter(10 * 1000);
});

// Private methods
// ---------------
/**
 * Creates the image on which run the tests.
 * @private
 * @param  {string}   id - Image id
 * @param  {function} cb - Callback on image load
 */
function testImage(id, cb) {
  let image = document.getElementById(id);

  if (image) {
    return cb.call(image);
  }

  let container = document.body.appendChild(document.createElement('div'));
  image         = document.createElement('img');
  image.id      = id;
  image.src     = IMAGE_PATH;
  image.onload  = cb;

  return container.appendChild(image);
}
