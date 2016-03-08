/**
 * @file Vdom module - test
 * @author StefanoMagrassi <stefano.magrassi@gmail.com>
 */

// Imports
// -------
import test from 'tape';
import imageHelper from './helpers/image';
import virtualdom from '../../lib/virtualdom';
import {CONTAINER_CLASS} from '../../lib/virtualdom';

// Tests
// -----
test('Lib: virtualdom', t => {
  imageHelper('vdom1', function() {
    const image = this;
    const data  = {
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
    const vdom     = virtualdom();
    const rendered = vdom.render(data);

    t.test('render() -> tag', st => {
      const actual = rendered.tagName.toLowerCase();
      const expect = 'div';

      st.equal(actual, expect, 'tagName should be "div"');
      st.end();
    });

    t.test('render() -> class', st => {
      const actual = rendered.properties.className;
      const expect = CONTAINER_CLASS.substring(1);

      st.equal(actual, expect, 'className should be equal to CONTAINER_CLASS const');
      st.end();
    });

    t.test('render() -> length', st => {
      const actual = rendered.children.length;
      const expect = data.rows * data.cols;

      st.equal(actual, expect, 'number of pieces should be rows * columns');
      st.end();
    });

    t.test('update(null) - clean the container', st => {
      const cleaned = vdom.update(null);
      const actual = cleaned.children.length;
      const expect = 0;

      st.equal(actual, expect, 'number of pieces should be 0');
      st.end();
    });

    t.end();
  });

  t.timeoutAfter(60 * 1000);
});
