// Imports
// -------
import test from 'tape';
import grid from '../lib/grid';

// Tests
// -----
test('grid() returns a collection of cells', function(t) {
  let rows   = 2;
  let cols   = 2;
  let w      = 100;
  let h      = 100;
  let actual = grid(rows, cols, w, h);
  let expect = [
    {row:0, col:0, width:w, height:h, x: 0, y:0},
    {row:0, col:1, width:w, height:h, x: w, y:0},
    {row:1, col:0, width:w, height:h, x: 0, y:h},
    {row:1, col:1, width:w, height:h, x: w, y:h}
  ];

  t.deepEqual(actual, expect, 'should returns a collection of cells');

  t.end();
});
