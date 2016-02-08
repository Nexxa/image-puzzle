/**
 * @file Vdom module - test
 * @author StefanoMagrassi <stefano.magrassi@gmail.com>
 */

// Imports
// -------
import test from 'tape';
import imageHelper from './helpers/image';
import vdom from '../../lib/vdom';
import {CONTAINER_CLASS} from '../../lib/vdom';

// Tests
// -----
test('vdom.render() renders a puzzle-pieces tree', function(t) {
  t.plan(3);

  imageHelper('vdom1', function() {
    let image = this;
    let data  = {
      image: image,
      rows: 2,
      cols: 2,
      pairs: [
        [{row:0, col:0, width:100, height:100, x:0, y:0},{position:0, bgX:0, bgY:0}],
        [{row:0, col:1, width:100, height:100, x:100, y:0},{position:1, bgX:-100, bgY:0}],
        [{row:1, col:0, width:100, height:100, x:0, y:-100},{position:2, bgX:0, bgY:-100}],
        [{row:1, col:1, width:100, height:100, x:-100, y:-100},{position:3, bgX:-100, bgY:-100}]
      ]
    };
    let rendered = vdom.render(data);

    let actual   = rendered.tagName.toLowerCase();
    let expect   = 'div';
    t.equal(actual, expect, 'tagName should be "div"');

    actual = rendered.properties.className;
    expect = CONTAINER_CLASS.substring(1);
    t.equal(actual, expect, 'className should be equal to CONTAINER_CLASS const');

    actual = rendered.children.length;
    expect = data.rows * data.cols;
    t.equal(actual, expect, 'number of pieces should be rows * columns');
  });

  t.timeoutAfter(10 * 1000);
});
