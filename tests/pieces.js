// Imports
// -------
import test from 'tape';
import _keys from 'lodash/keys';
import _sortBy from 'lodash/sortBy';
import {pieces, random} from '../lib/pieces';

// Tests
// -----
test('pieces() returns a collection of pieces', function(t) {
  let rows   = 2;
  let cols   = 2;
  let w      = 100;
  let h      = 100;
  let actual = pieces(rows, cols, w, h);
  let expect = [
    {row:1, col:1, index:1, width:100, height:100, x: 0, y:0},
    {row:1, col:2, index:2, width:100, height:100, x: 100, y:0},
    {row:2, col:1, index:3, width:100, height:100, x: 0, y:100},
    {row:2, col:2, index:4, width:100, height:100, x: 100, y:100}
  ];

  t.deepEqual(actual, expect, 'should returns a collection of pieces');

  t.end();
});

test('random() return a random collection of pieces', function(t) {
  let rows  = 2;
  let cols  = 2;
  let w     = 100;
  let h     = 100;
  let r     = random(rows, cols, w, h);
  let p     = _sortBy(_keys(pieces(rows, cols, w, h)[0]));
  let rs    = _sortBy(_keys(r[0]));
  let props = _sortBy(['row', 'col', 'index', 'width', 'height', 'randomIndex', 'x', 'y']);

  t.equal(r.length, rows * cols, 'collection length should be the number of rows and columns');
  t.deepEqual(rs, props, 'elements of collection should have the correct properties');
  t.notDeepEqual(p, r, 'random collection should be different from standard collection');

  t.end();
});
