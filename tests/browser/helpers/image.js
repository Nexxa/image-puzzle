/**
 * @file Image tests helper - Helper to create images html element during testing
 * @author StefanoMagrassi <stefano.magrassi@gmail.com>
 */

// Exports
// -------
export const IMAGE_PATH = 'http://i.telegraph.co.uk/multimedia/archive/02792/mountCook2_2792612b.jpg';

/**
 * Creates the image on which run the tests.
 * @private
 * @param  {string}   id - Image id
 * @param  {function} cb - Callback on image load
 */
export default function(id, cb) {
  let image = document.getElementById(id);

  if (image) {
    return cb.call(image);
  }

  const container = document.body.appendChild(document.createElement('div'));
  image         = document.createElement('img');
  image.id      = id;
  image.src     = IMAGE_PATH;
  image.onload  = cb;

  return container.appendChild(image);
}
