/**
 * @file Image puzzle test use
 * @author StefanoMagrassi <stefano.magrassi@gmail.com>
 */

// Imports
// -------
import imagePuzzle from '../index';

// Logic
// -----
const IMG_ID = 'img-puzzle_img';

document.body.onload = run;

function run() {
  let image = document.getElementById(IMG_ID);

  return imagePuzzle(image, 3, 3);
}
