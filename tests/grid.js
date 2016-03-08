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
test('Lib: grid', t => {
  const w    = 200;
  const h    = 200;
  const rows = 2;
  const cols = 2;

  const actual = grid(w, h, rows, cols);
  const expect = [
    {row:0, col:0, width:100, height:100, x:0, y:0},
    {row:0, col:1, width:100, height:100, x:100, y:0},
    {row:1, col:0, width:100, height:100, x:0, y:100},
    {row:1, col:1, width:100, height:100, x:100, y:100}
  ];

  t.deepEqual(actual, expect, 'should return a collection of pairs that represent the cells of a grid');
  t.end();
});
