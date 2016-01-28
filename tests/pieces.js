// Imports
// -------
import test from 'tape';
import pieces from '../lib/pieces';

// Tests
// -----
test('pieces() returns a collection of pieces', function(t) {
  let rows   = 2;
  let cols   = 2;
  let w      = 100;
  let h      = 100;
  let actual = pieces(rows, cols, w, h);
  let expect = [
    {row:1, col:1, index:1, width:100, height:100, oriX: 0, oriY:0},
    {row:1, col:2, index:2, width:100, height:100, oriX: 100, oriY:0},
    {row:2, col:1, index:3, width:100, height:100, oriX: 0, oriY:100},
    {row:2, col:2, index:4, width:100, height:100, oriX: 100, oriY:100}
  ];

  t.deepEqual(actual, expect, 'should returns a collection of pieces');

  t.end();
});
