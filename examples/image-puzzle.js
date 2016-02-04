/**
 * @file Image puzzle test use
 * @author StefanoMagrassi <stefano.magrassi@gmail.com>
 */

// Imports
// -------
import imagePuzzle from '../index';

// Logic
// -----
const IMG_ID          = 'img-puzzle_img';
const UPDATE_BTN_ID   = 'update';
const BUILD_33_BTN_ID = 'build33';
const BUILD_66_BTN_ID = 'build66';
const SAVE_BTN_ID     = 'save';
const STORAGE_KEY     = 'puzzle';

document.body.onload = run;

function run() {
  let image  = document.getElementById(IMG_ID);
  let puzzle = imagePuzzle(image, {rows: 3, cols: 3});

  console.log(puzzle);

  //puzzle.run(JSON.parse(sessionStorage.getItem(STORAGE_KEY)));

  let updateBtn = document.getElementById(UPDATE_BTN_ID);
  updateBtn.onclick = function() {
    puzzle.update();
  };

  let build33Btn = document.getElementById(BUILD_33_BTN_ID);
  build33Btn.onclick = function() {
    clean(image.parentNode);
    puzzle = imagePuzzle(image, {rows: 3, cols: 3});
  };

  let build66Btn = document.getElementById(BUILD_66_BTN_ID);
  build66Btn.onclick = function() {
    clean(image.parentNode);
    puzzle = imagePuzzle(image, {rows: 6, cols: 6});
  };

  let saveBtn = document.getElementById(SAVE_BTN_ID);
  saveBtn.onclick = function() {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(puzzle.last()));
  };

  return;
}

function clean(node) {
  Array.prototype.map.call(node.childNodes, (child) => child)
    .filter((child) => child.className === 'img-puzzle_piece')
    .forEach((child) => node.removeChild(child));
}
