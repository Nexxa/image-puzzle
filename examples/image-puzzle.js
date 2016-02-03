/**
 * @file Image puzzle test use
 * @author StefanoMagrassi <stefano.magrassi@gmail.com>
 */

// Imports
// -------
import imagePuzzle from '../index';

// Logic
// -----
const IMG_ID        = 'img-puzzle_img';
const UPDATE_BTN_ID = 'update';

document.body.onload = run;

function run() {
  let image = document.getElementById(IMG_ID);
  let puzzle = imagePuzzle(image, 3, 3);

  puzzle.render();

  let updateBtn = document.getElementById(UPDATE_BTN_ID);
  updateBtn.onclick = function() {
    puzzle.update();
  };

  return;
}
