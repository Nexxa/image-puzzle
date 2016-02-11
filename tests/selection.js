/**
 * @file Selection module - tests
 * @author StefanoMagrassi <stefano.magrassi@gmail.com>
 */

// Imports
// -------
import test from 'tape';
import selectionManager from '../lib/selection';
import {SELECTED_CLASS, EMPTY, PUZZLE_INDEX} from '../lib/selection';

// Mock object
// -----------
let mock   = {};
let target = {};

target[PUZZLE_INDEX] = 1;
mock.target = target;

// Tests
// -----
test('selectionManager.withIndex() updates selection state', function(t) {
  let selection = selectionManager();
  let actual    = selection.withIndex({}, mock);

  t.ok(actual, 'should update selection without errors');

  t.end();
});

test('selectionManager.toggleClass() return css class based on selection', function(t) {
  let selection = selectionManager();

  selection.withIndex({}, mock);

  let actual = selection.toggleClass(1);
  let expect = SELECTED_CLASS;

  t.equal(actual, expect, 'should return the selected class');

  actual = selection.toggleClass(0);
  expect = EMPTY;

  t.equal(actual, expect, 'should return empty string');

  t.end();
});
