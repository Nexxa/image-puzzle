/**
 * @file Image Puzzle - puzzle game factory
 * @author StefanoMagrassi <stefano.magrassi@gmail.com>
 */

// Imports
// -------
import _partial from 'lodash/partial';
import {default as render, update, last} from './lib/render';

// Exports
// -------
export default imagePuzzle;

// Public methods
// --------------
function imagePuzzle(image, rows, cols) {
  return {
    image : image,
    rows  : rows,
    cols  : cols,
    render: _partial(render, image, rows, cols),
    update: _partial(update, image, rows, cols),
    last  : last
  };
}
