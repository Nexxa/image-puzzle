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
test('Lib: collection', t => {
  t.test('sorted()', st => {
    const opts = {
      width : 200,
      height: 200,
      rows  : 2,
      cols  : 2
    };

    const actual = sorted(opts);
    const expect = [
      [{row:0, col:0, width:100, height:100, x:0, y:0}, {position:0, bgX:0, bgY:0}],
      [{row:0, col:1, width:100, height:100, x:100, y:0}, {position:1, bgX:-100, bgY:0}],
      [{row:1, col:0, width:100, height:100, x:0, y:100}, {position:2, bgX:0,bgY:-100}],
      [{row:1, col:1, width:100, height:100, x:100, y:100}, {position:3, bgX:-100, bgY:-100}]
    ];

    st.deepEqual(actual, expect, 'should return a collection of items');
    st.ok(itemsSorted(actual), 'items in collection should be sorted');
    st.end();
  });

  t.test('random()', st => {
    const opts = {
      width : 100,
      height: 100,
      rows  : 10,
      cols  : 10
    };

    const standard   = sorted(opts);
    const randomized = random(opts);

    st.equal(randomized.length, opts.rows * opts.cols, 'random should be as length as the number of rows and columns');
    st.equal(standard.length, randomized.length, 'random should be as length as standard');
    st.notOk(itemsSorted(randomized), 'items in collection should not be sorted');
    st.end();
  });


  t.end();
});

// Private methods
// ---------------
function itemsSorted(collection) {
  return collection.reduce((result, item, index) => result = (result && item[1].position === index), true);
}
