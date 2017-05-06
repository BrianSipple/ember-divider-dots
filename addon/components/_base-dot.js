import Component from 'ember-component';
import { scheduleOnce } from 'ember-runloop';
import { assert } from 'ember-metal/utils';

/**
 * Base Ember Component for each "dot"
 */
export default Component.extend({
  classNames: ['ember-divider-dots-dot'],

  containerComponent: null,

  didInsertElement() {
    this._super(...arguments);

    scheduleOnce('afterRender', this, 'registerWithContainerComponent');
  },

  willDestroyElement() {
    this._super(...arguments);

    scheduleOnce('actions', this, 'unregisterWithContainerComponent');
  },

  registerWithContainerComponent() {
    this.containerComponent.registerDotComponent(this);
  },

  unregisterWithContainerComponent() {
    this.containerComponent.unregisterDotComponent(this);
  },

  setDisplayProperties() {
    assert('`ember-divider-dots.base-dot#setDisplayPropterties: override this method in your dot component.', false);
  }
});
