/**
 * @file Image puzzle test use
 * @author StefanoMagrassi <stefano.magrassi@gmail.com>
 */

// Imports
// -------
import imagePuzzle from '../index';

const IMG_ID = 'img-puzzle_img';
let image = document.getElementById(IMG_ID);

image.onload = run;

function run() {
  let image = this;

  return imagePuzzle(image, 3, 3);
}
