/**
 * @file Piece object tests
 * @author StefanoMagrassi <stefano.magrassi@gmail.com>
 */

// Imports
// -------
import test from 'tape';
import {default as cell, x, y} from '../lib/cell';

// Tests
// -----
test('cell() returns a "cell" object', function(t) {
  let row    = 0;
  let col    = 1;
  let width  = 100;
  let height = 100;
  let actual = cell(row, col, width, height);
  let expect = {
    row   : row,
    col   : col,
    width : width,
    height: height,
    x     : 100,
    y     : 0
  };

  t.deepEqual(actual, expect, 'should returns a cell object');

  t.end();
});

test('x() returns "x" coordinate', function(t) {
  let width  = 100;
  let column = 1;
  let actual = x(width, column);
  let expect = (width * column);

  t.equal(actual, expect, 'should return "x" coordinate based on width and column');

  t.end();
});

test('y() returns "y" coordinate', function(t) {
  let height = 100;
  let row    = 0;
  let actual = y(height, row);
  let expect = (height * row);

  t.equal(actual, expect, 'should return "y" coordinate based on height and row');

  t.end();
});
