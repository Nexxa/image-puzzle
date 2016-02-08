/**
 * @file Image Puzzle - tests
 * @author StefanoMagrassi <stefano.magrassi@gmail.com>
 */

// Imports
// -------
import test from 'tape';
import imageHelper from './helpers/image';
import imagePuzzle from '../../index';

// Tests
// -----
test('imagePuzzle() returns a new Image Puzzle object', function(t) {
  t.plan(2);

  imageHelper('image-puzzle1', function() {
    let image = this;
    let puzzle = imagePuzzle(image);
    let actual = puzzle.config();
    let expect = {image: image, rows: 3, cols: 3, pairs: null};

    t.ok(puzzle, 'should not have errors');
    t.deepEqual(actual, expect, 'should use default configurations');
  });

  t.timeoutAfter(10 * 1000);
});

test('imagePuzzle() with specified configuration', function(t) {
  t.plan(1);

  imageHelper('image-puzzle2', function() {
    let image  = this;
    let data   = [
      [{row:0, col:0, width:100, height:100, x:0, y:0},{position:0, bgX:0, bgY:0}],
      [{row:0, col:1, width:100, height:100, x:100, y:0},{position:1, bgX:-100, bgY:0}],
      [{row:1, col:0, width:100, height:100, x:0, y:-100},{position:2, bgX:0, bgY:-100}],
      [{row:1, col:1, width:100, height:100, x:-100, y:-100},{position:3, bgX:-100, bgY:-100}]
    ];
    let config = {rows: 2, cols: 2, pairs: data};
    let puzzle = imagePuzzle(image, config);
    let actual = puzzle.config();
    let expect = {image: image, rows: config.rows, cols: config.cols, pairs: config.pairs};

    t.deepEqual(actual, expect, 'should use specified configuration');
  });

  t.timeoutAfter(10 * 1000);
});

test('imagePuzzle.state() gets the game state', function(t) {
  t.plan(2);

  imageHelper('image-puzzle3', function() {
    let image  = this;
    let data   = [
      [{row:0, col:0, width:100, height:100, x:0, y:0},{position:0, bgX:0, bgY:0}],
      [{row:0, col:1, width:100, height:100, x:100, y:0},{position:1, bgX:-100, bgY:0}],
      [{row:1, col:0, width:100, height:100, x:0, y:-100},{position:2, bgX:0, bgY:-100}],
      [{row:1, col:1, width:100, height:100, x:-100, y:-100},{position:3, bgX:-100, bgY:-100}]
    ];
    let config = {rows: 2, cols: 2, pairs: data};
    let puzzle = imagePuzzle(image, config);
    let actual = puzzle.state();
    let expect = {rows: config.rows, cols: config.cols, pairs: config.pairs};

    t.deepEqual(actual, expect, 'state() should returns the current game state as simple object');

    let asString = true;
    actual   = puzzle.state(asString);
    expect   = JSON.stringify({rows: config.rows, cols: config.cols, pairs: config.pairs});
    t.deepEqual(actual, expect, 'state(true) should returns the current game state as stringify JSON');
  });

  t.timeoutAfter(10 * 1000);
});

test('imagePuzzle.rebuild() generates a new grid with different rows and cols', function(t) {
  t.plan(1);

  imageHelper('image-puzzle4', function() {
    let image  = this;
    let puzzle = imagePuzzle(image);

    puzzle.rebuild(6, 6);

    let actual = [puzzle.config().rows, puzzle.config().cols];
    let expect = [6, 6];

    t.deepEqual(actual, expect, 'rebuild() should create a new grid');
  });

  t.timeoutAfter(10 * 1000);
});
