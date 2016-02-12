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
const BUILD_44_BTN_ID = 'build44';
const BUILD_55_BTN_ID = 'build55';
const SAVE_BTN_ID     = 'save';
const STORAGE_KEY     = 'puzzle';

document.addEventListener('DOMContentLoaded', run, false);

function run() {
  let image  = document.getElementById(IMG_ID);
  let puzzle = imagePuzzle(image, config(), resolution);

  click(UPDATE_BTN_ID,   () => puzzle.update());
  click(BUILD_33_BTN_ID, () => puzzle.rebuild(3, 3));
  click(BUILD_44_BTN_ID, () => puzzle.rebuild(4, 4));
  click(BUILD_55_BTN_ID, () => puzzle.rebuild(5, 5));
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

function resolution() {
  return alert('Puzzle resolved!');
}

function click(id, cb) {
  document.getElementById(id).addEventListener('click', cb);
}

function save(content) {
  return sessionStorage.setItem(STORAGE_KEY, content);
}
