/**
 * @file Utils module - tests
 * @author StefanoMagrassi <stefano.magrassi@gmail.com>
 */

// Imports
// -------
import test from 'tape';
import {pairs, containedIn, rangeFrom0, propWithPx, showEl, hideEl} from '../lib/utils';

// Tests
// -----
test('Lib: utils', t => {
  test('pairs() gets pairs property from object', st => {
    let data   = {pairs: [['a'], [1]]};
    const actual = pairs(data);
    const expect = data.pairs;

    st.deepEqual(actual, expect, 'should gets the value of pairs property');

    data = {data: [1,2,3]};
    st.notOk(pairs(data), 'should returns undefined is property is not in object');
    st.end();
  });

  test('containedIn() checks if collection contains item', st => {
    const collection = [0,1,2,3,4];

    st.ok(containedIn(collection, 2), 'should returns true if item is in collection');
    st.notOk(containedIn(collection, 5), 'should returns false if item is not in collection');
    st.end();
  });

  test('rangeFrom0() create a range of indexes from 0', st => {
    const actual = rangeFrom0(5);
    const expect = [0,1,2,3,4];

    st.deepEqual(actual, expect, 'should returns an array of indexes from 0');
    st.end();
  });

  test('propWithPx() gets property with px', st => {
    const data = {x: 10};
    const actual = propWithPx('x', data);
    const expect = '10px';

    st.equal(actual, expect, 'should returns the property object with "px"');
    st.end();
  });

  t.test('showEl()', st => {
    const el = {style: {visibility: ''}};
    showEl(el);
    const actual = el.style.visibility;
    const expect = 'visible';

    st.equal(actual, expect, 'should set "visibility" to "visible"');
    st.end();
  });

  t.test('hideEl()', st => {
    const el = {style: {visibility: ''}};
    hideEl(el);
    const actual      = el.style.visibility;
    const expect      = 'hidden';

    st.equal(actual, expect, 'should set "visibility" to "hidden"');
    st.end();
  });

  t.end();
});
