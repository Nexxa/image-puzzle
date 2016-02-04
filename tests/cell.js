/**
 * @file Cell module - tests
 * @author StefanoMagrassi <stefano.magrassi@gmail.com>
 */

// Imports
// -------
import test from 'tape';
import cell from '../lib/cell';

// Tests
// -----
test('cell() returns a "cell" object', function(t) {
  let row    = 0;
  let col    = 1;
  let width  = 100;
  let height = 100;
  let actual = cell(width, height, row, col);
  let expect = {
    row     : row,
    col     : col,
    width   : width,
    height  : height,
    x       : 100,
    y       : 0
  };

  t.deepEqual(actual, expect, 'should returns a cell object');

  t.end();
});
