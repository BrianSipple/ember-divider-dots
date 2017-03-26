import Component from 'ember-component';
import computed, { readOnly } from 'ember-computed';

export default Component.extend({
  tagName: 'circle',
  attributeBindings: ['cx', 'cy', 'radius:r'],

  radius: 0,
  coords: null,

  cx: readOnly('coords.centerX'),
  cy: readOnly('coords.centerY'),
});
