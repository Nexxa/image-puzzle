/**
 * @file Image puzzle test use
 * @author StefanoMagrassi <stefano.magrassi@gmail.com>
 */

// Imports
// -------
import imagePuzzle from '../index';

// Logic
// -----
const STORAGE_KEY = 'puzzle';

document.addEventListener('DOMContentLoaded', onload, false);

function onload() {
  const image = document.getElementById('img-puzzle_img');

  if (image.complete) {
    return run(image);
  }

  return image.addEventListener('load', () => run(image));
}

function run(image) {
  const puzzle = imagePuzzle(image, config(), resolution, flip);

  click('update',  () => puzzle.update());
  click('build33', () => puzzle.rebuild(3, 3));
  click('build44', () => puzzle.rebuild(4, 4));
  click('build55', () => puzzle.rebuild(5, 5));
  click('save',    () => save(puzzle.state(true)));

  return;
}

function config() {
  const inSession = sessionStorage.getItem(STORAGE_KEY);

  if (inSession !== null) {
    return JSON.parse(inSession);
  }

  return {rows: 3, cols: 3};
}

function flip(data) {
  if (!window.console) {
    return;
  }

  return window.console.log(data);
}

function resolution() {
  return alert('Puzzle resolved!');
}

function click(id, cb) {
  return document.getElementById(id).addEventListener('click', cb);
}

function save(content) {
  return sessionStorage.setItem(STORAGE_KEY, content);
}
