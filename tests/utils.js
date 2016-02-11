/**
 * @file Utils module - tests
 * @author StefanoMagrassi <stefano.magrassi@gmail.com>
 */

// Imports
// -------
import test from 'tape';
import {pairs, containedIn, rangeFrom0, propWithPx} from '../lib/utils';

// Tests
// -----
test('utils.pairs() gets pairs property from object', function(t) {
  let data   = {pairs: [['a'], [1]]};
  let actual = pairs(data);
  let expect = data.pairs;

  t.deepEqual(actual, expect, 'should gets the value of pairs property');

  data = {data: [1,2,3]};
  t.notOk(pairs(data), 'should returns undefined is property is not in object');

  t.end();
});

test('utils.containedIn() checks if collection contains item', function(t) {
  let collection = [0,1,2,3,4];

  t.ok(containedIn(collection, 2), 'should returns true if item is in collection');
  t.notOk(containedIn(collection, 5), 'should returns false if item is not in collection');

  t.end();
});

test('utils.rangeFrom0() create a range of indexes from 0', function(t) {
  let actual = rangeFrom0(5);
  let expect = [0,1,2,3,4];

  t.deepEqual(actual, expect, 'should returns an array of indexes from 0');

  t.end();
});

test('utils.propWithPx() gets property with px', function(t) {
  let data = {x: 10};
  let actual = propWithPx('x', data);
  let expect = '10px';

  t.equal(actual, expect, 'should returns the property object with "px"');

  t.end();
});
