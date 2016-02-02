// Imports
// -------
import test from 'tape';
import render from '../../lib/render';

// Tests
// -----
test('render() returns the collection of image pieces', function(t) {
  t.plan(1);

  testImage(function() {
    let image    = this;
    let rows     = 10;
    let cols     = 10;
    let rendered = render(image, rows, cols);
    let actual   = rendered.length;
    let expect   = rows * cols;

    t.equal(actual, expect, 'rendered should be as length as the number of rows and columns');
  });
});

test('render() puts pieces on image', function(t) {
  t.plan(1);

  testImage(function() {
    let image = this;

    t.ok(render(image, 1, 1), 'should not have errors');
  });
});

test('render() needs and image element', function(t) {
  t.plan(1);

  let image;

  t.notOk(render(image, 3, 3), 'should fail without image');
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

  image        = document.createElement('img');
  image.src    = IMAGE_PATH;
  image.onload = cb;

  return document.body.appendChild(image);
}
