/**
 * @file Puzzle module - tests
 * @author StefanoMagrassi <stefano.magrassi@gmail.com>
 */

// Imports
// -------
import test from 'tape';
import puzzle from '../../lib/puzzle';

// Constants
// ---------
const IMAGE_ID   = 'img-puzzle_img';
const IMAGE_PATH = 'http://i.telegraph.co.uk/multimedia/archive/02792/mountCook2_2792612b.jpg';

// Tests
// -----
test('run() returns the collection of image pieces', function(t) {
  t.plan(1);

  testImage(IMAGE_ID, function() {
    let image    = this;
    let rows     = 10;
    let cols     = 10;
    let rendered = puzzle.run(image, rows, cols);
    let actual   = rendered.length;
    let expect   = rows * cols;

    t.equal(actual, expect, 'rendered should be as length as the number of rows and columns');
  });

  t.timeoutAfter(10 * 1000);
});

test('run() with existent data', function(t) {
  t.plan(1);

  let data = [
    [{row:0, col:0, width:100, height:100, x:0, y:0},{position:0, bgX:0, bgY:0}],
    [{row:0, col:1, width:100, height:100, x:100, y:0},{position:1, bgX:-100, bgY:0}],
    [{row:1, col:0, width:100, height:100, x:0, y:-100},{position:2, bgX:0, bgY:-100}],
    [{row:1, col:1, width:100, height:100, x:-100, y:-100},{position:3, bgX:-100, bgY:-100}]
  ];

  testImage(IMAGE_ID, function() {
    let image  = this;
    let rows   = 2;
    let cols   = 2;
    let actual = puzzle.run(image, rows, cols, data);

    t.deepEqual(actual, data, 'should returns the passed data');
  });

  t.timeoutAfter(10 * 1000);
});

test('update() refresh puzzle pieces', function(t) {
  t.plan(1);

  testImage(IMAGE_ID, function() {
    let image = this;

    t.ok(puzzle.update(image), 'should not have errors');
  });

  t.timeoutAfter(10 * 1000);
});

test('last() gets or sets the last computed collection', function(t) {
  let data = [
    [{row:0, col:0, width:100, height:100, x:0, y:0},{position:0, bgX:0, bgY:0}],
    [{row:0, col:1, width:100, height:100, x:100, y:0},{position:1, bgX:-100, bgY:0}],
    [{row:1, col:0, width:100, height:100, x:0, y:-100},{position:2, bgX:0, bgY:-100}],
    [{row:1, col:1, width:100, height:100, x:-100, y:-100},{position:3, bgX:-100, bgY:-100}]
  ];
  let actual = puzzle.last(data);
  let expect = [
    [{row:0, col:0, width:100, height:100, x:0, y:0},{position:0, bgX:0, bgY:0}],
    [{row:0, col:1, width:100, height:100, x:100, y:0},{position:1, bgX:-100, bgY:0}],
    [{row:1, col:0, width:100, height:100, x:0, y:-100},{position:2, bgX:0, bgY:-100}],
    [{row:1, col:1, width:100, height:100, x:-100, y:-100},{position:3, bgX:-100, bgY:-100}]
  ];

  t.deepEqual(actual, expect, 'should set and returns the last computed collection');
  t.deepEqual(puzzle.last(), expect, 'should returns the last computed collection');
  t.end();
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
