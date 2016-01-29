// Imports
// -------
import test from 'tape';
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
    {row:1, col:1, index:1, width:100, height:100, oriX: 0, oriY:0},
    {row:1, col:2, index:2, width:100, height:100, oriX: 100, oriY:0},
    {row:2, col:1, index:3, width:100, height:100, oriX: 0, oriY:100},
    {row:2, col:2, index:4, width:100, height:100, oriX: 100, oriY:100}
  ];

  t.deepEqual(actual, expect, 'should returns a collection of pieces');

  t.end();
});

test('random() return a random collection of pieces', function(t) {
  let rows     = 2;
  let cols     = 2;
  let w        = 100;
  let h        = 100;
  let p        = pieces(rows, cols, w, h);
  let r        = random(rows, cols, w, h);
  let hasProps = hasProperties(r[0], ['row', 'col', 'index', 'width', 'oriX', 'oriY']);

  t.equal(r.length, rows * cols, 'collection length should be the number of rows and columns');
  t.ok(hasProps, 'elements of collection should have the correct properties');
  t.notDeepEqual(p, r, 'random collection should be different from standard collection');

  t.end();
});

// Private methods
// ---------------
/**
 * Checks if object has specified properties.
 * @private
 * @param  {object} obj   - The object
 * @param  {array}  props - Array of property names to check
 * @return {boolean}
 */
function hasProperties(obj, props) {
  return props.reduce(function(acc, prop) {
    return (acc && obj.hasOwnProperty(prop));
  }, true);
}
