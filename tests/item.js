/**
 * @file Piece object tests
 * @author StefanoMagrassi <stefano.magrassi@gmail.com>
 */

// Imports
// -------
import test from 'tape';
import {default as item, bgX, bgY} from '../lib/item';

// Tests
// -----
test('item() returns an "item" object', function(t) {
  let index  = 0;
  let row    = 0;
  let col    = 1;
  let width  = 100;
  let height = 100;
  let actual = item(index, row, col, width, height);
  let expect = {
    position: index,
    row     : row,
    col     : col,
    width   : width,
    height  : height,
    bgX     : -100,
    bgY     : 0
  };

  t.deepEqual(actual, expect, 'should returns an item object');

  t.end();
});

test('bgX() returns background "x"-position', function(t) {
  let width  = 100;
  let column = 1;
  let actual = bgX(width, column);
  let expect = -(width * column);

  t.equal(actual, expect, 'should return background "x"-position based on width and column');

  t.end();
});

test('bgY() returns background "y"-position', function(t) {
  let height = 100;
  let row    = 0;
  let actual = bgY(height, row);
  let expect = -(height * row);

  t.equal(actual, expect, 'should return background "y"-position based on height and row');

  t.end();
});
