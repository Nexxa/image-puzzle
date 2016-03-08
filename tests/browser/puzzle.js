/**
 * @file Puzzle module - tests
 * @author StefanoMagrassi <stefano.magrassi@gmail.com>
 */

// Imports
// -------
import test from 'tape';
import imageHelper from './helpers/image';
import puzzle from '../../lib/puzzle';

// Tests
// -----
test('Lib: puzzle', t => {
  imageHelper('puzzle1', function() {
    const data = {
      image: this,
      rows : 10,
      cols : 10
    };
    const rendered = puzzle.run(data);
    const actual   = rendered.pairs.length;
    const expect   = data.rows * data.cols;

    t.equal(actual, expect, 'rendered should be as length as the number of rows and columns');
    t.end();
  });

  t.timeoutAfter(60 * 1000);
});

test('Lib: puzzle - with existent data', t => {
  const data = {
    image: null,
    rows : 2,
    cols : 2,
    pairs: [
      [{row:0, col:0, width:100, height:100, x:0, y:0},{position:0, bgX:0, bgY:0}],
      [{row:0, col:1, width:100, height:100, x:100, y:0},{position:1, bgX:-100, bgY:0}],
      [{row:1, col:0, width:100, height:100, x:0, y:-100},{position:2, bgX:0, bgY:-100}],
      [{row:1, col:1, width:100, height:100, x:-100, y:-100},{position:3, bgX:-100, bgY:-100}]
    ]
  };

  imageHelper('puzzle2', function() {
    const image      = this;
    const puzzleData = Object.create(data);

    puzzleData.image = image;

    t.test('run()', st => {
      const actual = puzzle.run(puzzleData);

      st.deepEqual(actual, puzzleData, 'should return the passed data');
      st.end();
    });

    t.test('update()', st => {
      const actual = puzzle.update(puzzleData);

      st.ok(actual, 'should refresh without errors');
      st.end();
    });

    t.end();
  });

  t.test('win()', st => {
    const dataWin = Object.create(data);

    st.ok(puzzle.win(dataWin), 'should win when pairs are sorted in the right way');
    st.end();
  });

  t.test('flip()', st => {
    const puzzleData = Object.create(data);
    const actual = puzzle.flip(1, 3, puzzleData).pairs;
    const expect = [
      [{row:0, col:0, width:100, height:100, x:0, y:0},{position:0, bgX:0, bgY:0}],
      [{row:0, col:1, width:100, height:100, x:100, y:0},{position:3, bgX:-100, bgY:-100}],
      [{row:1, col:0, width:100, height:100, x:0, y:-100},{position:2, bgX:0, bgY:-100}],
      [{row:1, col:1, width:100, height:100, x:-100, y:-100},{position:1, bgX:-100, bgY:0}]
    ];

    st.deepEqual(actual, expect, 'should flip the two items at the specified indexes');
    st.end();
  });

  t.timeoutAfter(60 * 1000);
});
