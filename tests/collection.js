// Imports
// -------
import test from 'tape';
import {default as collection, random} from '../lib/collection';

// Tests
// -----
test('collection() returns a collection of items', function(t) {
  let rows   = 2;
  let cols   = 2;
  let w      = 100;
  let h      = 100;
  let actual = collection(rows, cols, w, h);
  let expect = [
    {row:0, col:0, position:0, width:w, height:h, x:0, y:0, bgX:0,    bgY:0},
    {row:0, col:1, position:1, width:w, height:h, x:w, y:0, bgX:-(w), bgY:0},
    {row:1, col:0, position:2, width:w, height:h, x:0, y:h, bgX:0,    bgY:-(h)},
    {row:1, col:1, position:3, width:w, height:h, x:w, y:h, bgX:-(w), bgY:-(h)}
  ];

  t.deepEqual(actual, expect, 'should returns a collection of items');

  t.end();
});

test('random() return a random collection of items', function(t) {
  let rows       = 10;
  let cols       = 10;
  let w          = 100;
  let h          = 100;
  let standard   = collection(rows, cols, w, h);
  let randomized = random(rows, cols, w, h);

  t.equal(randomized.length, rows * cols, 'random should be as length as the number of rows and columns');
  t.equal(standard.length, randomized.length, 'random should be as length as standard');

  t.end();
});
