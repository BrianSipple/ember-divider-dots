import BaseDot from './_base-dot';
import set from 'ember-metal/set';
import { DOT_TYPE_CIRCLE } from 'ember-divider-dots/utils/dot-types';

export default BaseDot.extend({
  tagName: 'circle',
  attributeBindings: ['cx', 'cy', 'radius:r'],

  'data-test-dot-type': DOT_TYPE_CIRCLE,

  cx: undefined,
  cy: undefined,
  radius: undefined,

  setDisplayProperties({ coords: { centerX, centerY }, crossSize }) {
    set(this, 'radius', crossSize / 2);
    set(this, 'cx', centerX);
    set(this, 'cy', centerY);
  }
});
