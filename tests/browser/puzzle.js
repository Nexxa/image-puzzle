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
test('puzzle.run() returns the collection of image pieces', function(t) {
  t.plan(1);

  imageHelper('puzzle1', function() {
    let data = {
      image: this,
      rows : 10,
      cols : 10
    };
    let rendered = puzzle.run(data);
    let actual   = rendered.pairs.length;
    let expect   = data.rows * data.cols;

    t.equal(actual, expect, 'rendered should be as length as the number of rows and columns');
  });

  t.timeoutAfter(10 * 1000);
});

test('puzzle.run() with existent data', function(t) {
  t.plan(1);


  imageHelper('puzzle2', function() {
    let image  = this;
    let data = {
      image: image,
      rows: 2,
      cols: 2,
      pairs: [
        [{row:0, col:0, width:100, height:100, x:0, y:0},{position:0, bgX:0, bgY:0}],
        [{row:0, col:1, width:100, height:100, x:100, y:0},{position:1, bgX:-100, bgY:0}],
        [{row:1, col:0, width:100, height:100, x:0, y:-100},{position:2, bgX:0, bgY:-100}],
        [{row:1, col:1, width:100, height:100, x:-100, y:-100},{position:3, bgX:-100, bgY:-100}]
      ]
    };
    let actual = puzzle.run(data);

    t.deepEqual(actual, data, 'should returns the passed data');
  });

  t.timeoutAfter(10 * 1000);
});

test('puzzle.update() refresh puzzle pieces', function(t) {
  t.plan(1);

  imageHelper('puzzle2', function() {
    let image = this;
    let data = {image: image};

    t.ok(puzzle.update(data), 'should not have errors');
  });

  t.timeoutAfter(10 * 1000);
});

test('puzzle.last() gets or sets the last computed collection', function(t) {
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

test('puzzle.win() checks if game move is winning', function(t) {
  let dataLoose = {
    image: document.createElement('img'), // Just an empty image
    row  : 2,
    cols : 2,
    pairs: [
      [{row:0, col:0, width:100, height:100, x:0, y:0},{position:3, bgX:-100, bgY:-100}],
      [{row:0, col:1, width:100, height:100, x:100, y:0},{position:1, bgX:-100, bgY:0}],
      [{row:1, col:0, width:100, height:100, x:0, y:-100},{position:0, bgX:0, bgY:0}],
      [{row:1, col:1, width:100, height:100, x:-100, y:-100},{position:2, bgX:0, bgY:-100}]
    ]
  };
  t.notOk(puzzle.win(dataLoose), 'should not win when pairs are not sorted in the right way');

  let dataWin = {
    image: document.createElement('img'), // Just an empty image
    row  : 2,
    cols : 2,
    pairs: [
      [{row:0, col:0, width:100, height:100, x:0, y:0},{position:0, bgX:0, bgY:0}],
      [{row:0, col:1, width:100, height:100, x:100, y:0},{position:1, bgX:-100, bgY:0}],
      [{row:1, col:0, width:100, height:100, x:0, y:-100},{position:2, bgX:0, bgY:-100}],
      [{row:1, col:1, width:100, height:100, x:-100, y:-100},{position:3, bgX:-100, bgY:-100}]
    ]
  };
  t.ok(puzzle.win(dataWin), 'should win when pairs are sorted in the right way');

  t.end();
});
