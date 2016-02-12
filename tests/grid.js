/**
 * @file Grid module - tests
 * @author StefanoMagrassi <stefano.magrassi@gmail.com>
 */

// Imports
// -------
import test from 'tape';
import grid from '../lib/grid';

// Tests
// -----
test('grid() returns a representation of a grid', function(t) {
  let w      = 200;
  let h      = 200;
  let rows   = 2;
  let cols   = 2;
  let actual = grid(w, h, rows, cols);
  let expect = [
    {row:0, col:0, width:100, height:100, x:0, y:0},
    {row:0, col:1, width:100, height:100, x:100, y:0},
    {row:1, col:0, width:100, height:100, x:0, y:100},
    {row:1, col:1, width:100, height:100, x:100, y:100}
  ];

  t.deepEqual(actual, expect, 'should returns a collection of pairs that represent the cells of a grid');

  t.end();
});
