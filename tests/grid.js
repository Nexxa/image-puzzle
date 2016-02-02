// Imports
// -------
import test from 'tape';
import grid from '../lib/grid';

// Tests
// -----
test('grid() returns a representation of a grid', function(t) {
  let rows   = 2;
  let cols   = 2;
  let actual = grid(rows, cols);
  let expect = [[0, 0], [0, 1], [1, 0], [1, 1]];

  t.deepEqual(actual, expect, 'should returns a collection of pairs that represent the cells of a grid');

  t.end();
});
