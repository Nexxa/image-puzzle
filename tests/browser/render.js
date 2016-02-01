// Imports
// -------
import test from 'tape';
import _keys from 'lodash/keys';
import _values from 'lodash/values';
import _sortBy from 'lodash/sortBy';
import render from '../../lib/render';
import {KEYS} from '../../lib/pieces';

// Tests
// -----
test('render() returns the collection of image pieces', function(t) {
  t.plan(1);

  testImage(function() {
    let image  = this;
    let rows   = 2;
    let cols   = 2;
    let actual = _sortBy(_keys(render(image, rows, cols)[0]));
    let expect = _sortBy(_values(KEYS));

    t.deepEqual(actual, expect, 'should return the collection of pieces');
  });
});

test('render() puts pieces on image', function(t) {
  t.plan(1);

  testImage(function() {
    let image = this;

    t.ok(render(image, 1, 1), 'should be ok');
  });
});

test('render() fails without image', function(t) {
  t.plan(1);

  let image;

  t.notOk(render(image, 3, 3), 'should be not ok');
});

// Private methods
// ---------------
/**
 * Creates the image on which run the tests.
 * @private
 * @param  {function} cb - Callback on image load
 * @return {undefined}
 */
function testImage(cb) {
  const ID         = 'img-puzzle_img';
  const IMAGE_PATH = 'http://i.telegraph.co.uk/multimedia/archive/02792/mountCook2_2792612b.jpg';

  let image = document.getElementById(ID);

  if (image) {
    return cb.call(image);
  }

  image    = document.createElement('img');
  image.src    = IMAGE_PATH;
  image.onload = cb;

  return document.body.appendChild(image);
}
