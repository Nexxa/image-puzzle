/**
 * @file Piece object tests
 * @author StefanoMagrassi <stefano.magrassi@gmail.com>
 */

// Imports
// -------
import test from 'tape';
import item from '../lib/item';

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
    x       : 100,
    y       : 0,
    bgX     : -100,
    bgY     : 0
  };

  t.deepEqual(actual, expect, 'should returns an item object');

  t.end();
});
