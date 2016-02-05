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

document.addEventListener('DOMContentLoaded', run, false);

function run() {
  let image  = document.getElementById(IMG_ID);
  let puzzle = imagePuzzle(image, config());

  click(UPDATE_BTN_ID,   () => puzzle.update());
  click(BUILD_33_BTN_ID, () => puzzle.rebuild(3, 3));
  click(BUILD_66_BTN_ID, () => puzzle.rebuild(6, 6));
  click(SAVE_BTN_ID,     () => save(puzzle.state(true)));

  return;
}

function config() {
  let inSession = sessionStorage.getItem(STORAGE_KEY);

  if (inSession !== null) {
    return JSON.parse(inSession);
  }

  return {rows: 3, cols: 3};
}

function click(id, cb) {
  document.getElementById(id).addEventListener('click', cb);
}

function save(content) {
  return sessionStorage.setItem(STORAGE_KEY, content);
}
