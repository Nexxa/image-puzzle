/**
 * @file Selection module - tests
 * @author StefanoMagrassi <stefano.magrassi@gmail.com>
 */

// Imports
// -------
import test from 'tape';
import selectionManager from '../lib/selection';
import {SELECTED_CLASS, EMPTY, PUZZLE_INDEX} from '../lib/selection';

// Tests
test('Lib: selection', t => {
  // Mock object
  // -----------
  const target = {};
  target[PUZZLE_INDEX] = 1;

  const mock      = {target: target};
  const selection = selectionManager();
  const selected  = selection.withIndex({}, mock);

  t.test('withIndex()', st => {
    const actual = selected;

    st.ok(actual, 'should update selection without errors');
    st.end();
  });

  t.test('toggleClass()', st => {
    let actual = selection.toggleClass(1);
    let expect = SELECTED_CLASS;

    st.equal(actual, expect, 'should return the selected class');

    actual = selection.toggleClass(0);
    expect = EMPTY;

    st.equal(actual, expect, 'should return empty string');
    st.end();
  });

  t.end();
});
