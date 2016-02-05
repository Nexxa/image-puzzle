/**
 * @file collection module - tests
 * @author StefanoMagrassi <stefano.magrassi@gmail.com>
 */

// Imports
// -------
import test from 'tape';
import {default as sorted, random} from '../lib/collection';

// Tests
// -----
test('collection.sorted() returns a collection of items', function(t) {
  let opts = {
    width : 200,
    height: 200,
    rows  : 2,
    cols  : 2
  };

  let actual = sorted(opts);
  let expect = [
    [{row:0, col:0, width:100, height:100, x:0, y:0}, {position:0, bgX:0, bgY:0}],
    [{row:0, col:1, width:100, height:100, x:100, y:0}, {position:1, bgX:-100, bgY:0}],
    [{row:1, col:0, width:100, height:100, x:0, y:100}, {position:2, bgX:0,bgY:-100}],
    [{row:1, col:1, width:100, height:100, x:100, y:100}, {position:3, bgX:-100, bgY:-100}]
  ];

  t.deepEqual(actual, expect, 'should returns a collection of items');
  t.ok(itemsSorted(actual), 'items in collection should be sorted');

  t.end();
});

test('collection.random() return a random collection of items', function(t) {
  let opts = {
    width : 100,
    height: 100,
    rows  : 10,
    cols  : 10
  };

  let standard   = sorted(opts);
  let randomized = random(opts);

  t.equal(randomized.length, opts.rows * opts.cols, 'random should be as length as the number of rows and columns');
  t.equal(standard.length, randomized.length, 'random should be as length as standard');
  t.notOk(itemsSorted(randomized), 'items in collection should not be sorted');

  t.end();
});

// Private methods
// ---------------
function itemsSorted(collection) {
  return collection.reduce((result, item, index) => result = (result && item[1].position === index), true);
}
