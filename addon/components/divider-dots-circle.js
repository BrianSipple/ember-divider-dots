import Component from 'ember-component';
import { scheduleOnce } from 'ember-runloop';

export default Component.extend({
  tagName: 'circle',
  classNames: ['ember-divider-dots__dot'],
  attributeBindings: ['cx', 'cy', 'radius:r'],

  containerComponent: null,
  cx: undefined,
  cy: undefined,
  radius: undefined,
  coords: null,

  didInsertElement() {
    this._super(...arguments);

    scheduleOnce('afterRender', this, 'registerWithContainerComponent');
  },

  willDestroyElement() {
    this._super(...arguments);

    scheduleOnce('actions', this, 'unregisterWithContainerComponent');
  },

  registerWithContainerComponent() {
    debugger;
    this.containerComponent.registerDotComponent(this);
  },

  unregisterWithContainerComponent() {
    this.containerComponent.unregisterDotComponent(this);
  },

  setDisplayProperties({ coords: { centerX, centerY }, radius }) {
    this.set('radius', radius);
    this.set('cx', centerX);
    this.set('cy', centerY);
  }
});
