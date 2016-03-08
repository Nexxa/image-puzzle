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
test('Lib: cell', t => {
  const row    = 0;
  const col    = 1;
  const width  = 100;
  const height = 100;

  const actual = cell(width, height, row, col);
  const expect = {
    row   : row,
    col   : col,
    width : width,
    height: height,
    x     : 100,
    y     : 0
  };

  t.deepEqual(actual, expect, 'should returns a cell object');
  t.end();
});
