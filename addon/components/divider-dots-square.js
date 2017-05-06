import BaseDot from './_base-dot';
import set from 'ember-metal/set';
import { DOT_TYPE_SQUARE } from 'ember-divider-dots/utils/dot-types';

export default BaseDot.extend({
  tagName: 'rect',
  attributeBindings: ['x', 'y', 'width', 'height'],

  'data-test-dot-type': DOT_TYPE_SQUARE,

  x: undefined,
  y: undefined,
  width: undefined,
  height: undefined,

  setDisplayProperties({ coords: { top, left }, crossSize }) {
    set(this, 'height', crossSize);
    set(this, 'width', crossSize);
    set(this, 'x', left);
    set(this, 'y', top);
  }
});
