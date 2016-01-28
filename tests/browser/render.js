// Imports
// -------
import test from 'tape';
import render from '../../lib/render';

// Testing
// -------
test('render() returns the collection of image pieces', function(t) {
  t.plan(1);

  testImage(function() {
    let image  = this;
    let rows   = 2;
    let cols   = 2;
    let w      = image.width / cols;
    let h      = image.height / rows;
    let actual = render(image, rows, cols);
    let expect = [
      {row:1, col:1, index:1, width:w, height:h, oriX: 0, oriY:0},
      {row:1, col:2, index:2, width:w, height:h, oriX: w, oriY:0},
      {row:2, col:1, index:3, width:w, height:h, oriX: 0, oriY:h},
      {row:2, col:2, index:4, width:w, height:h, oriX: w, oriY:h}
    ];

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
