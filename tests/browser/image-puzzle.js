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
test('imagePuzzle()', t => {
  imageHelper('image-puzzle1', function() {
    const image = this;
    const puzzle = imagePuzzle(image);

    t.test('new puzzle', st => {
      const actual = puzzle.config();
      const expect = {image: image, rows: 3, cols: 3, pairs: null};

      st.ok(puzzle, 'should not have errors');
      st.deepEqual(actual, expect, 'should use default config()s');
      st.end();
    });

    t.test('rebuild puzzle with different rows and cols', st => {
      puzzle.rebuild(6, 6);

      const actual = [puzzle.config().rows, puzzle.config().cols];
      const expect = [6, 6];

      st.deepEqual(actual, expect, 'should create a new grid');
      st.end();
    });

    t.test('show image', st => {
      const puzzleImage = puzzle.show();
      const actual      = puzzleImage.style.visibility;
      const expect      = 'visible';

      st.equal(actual, expect, 'should set "visibility" to "visible"');
      st.end();
    });

    t.test('hide image', st => {
      const puzzleImage = puzzle.hide();
      const actual      = puzzleImage.style.visibility;
      const expect      = 'hidden';

      st.equal(actual, expect, 'should set "visibility" to "hidden"');
      st.end();
    });

    t.end();
  });

  t.timeoutAfter(60 * 1000);
});

test('imagePuzzle() with specified configuration', t => {
  imageHelper('image-puzzle2', function() {
    const image  = this;
    const data   = [
      [{row:0, col:0, width:100, height:100, x:0, y:0},{position:0, bgX:0, bgY:0}],
      [{row:0, col:1, width:100, height:100, x:100, y:0},{position:1, bgX:-100, bgY:0}],
      [{row:1, col:0, width:100, height:100, x:0, y:-100},{position:2, bgX:0, bgY:-100}],
      [{row:1, col:1, width:100, height:100, x:-100, y:-100},{position:3, bgX:-100, bgY:-100}]
    ];
    const config = {rows: 2, cols: 2, pairs: data};
    const puzzle = imagePuzzle(image, config);

    t.test('new puzzle with config', st => {
      const actual = puzzle.config();
      const expect = {image: image, rows: config.rows, cols: config.cols, pairs: config.pairs};

      st.deepEqual(actual, expect, 'should use specified configuration');
      st.end();
    });

    t.test('game state', st => {
      const actual = puzzle.state();
      const expect = {rows: config.rows, cols: config.cols, pairs: config.pairs};

      st.deepEqual(actual, expect, 'should return the current game state as simple object');
      st.end();
    });

    t.test('game state as json string', st => {
      const asString = true;
      const actual   = puzzle.state(asString);
      const expect   = JSON.stringify({rows: config.rows, cols: config.cols, pairs: config.pairs});

      st.deepEqual(actual, expect, 'should return the current game state as stringify JSON');
      st.end();
    });

    t.end();
  });

  t.timeoutAfter(60 * 1000);
});
