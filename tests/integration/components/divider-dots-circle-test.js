import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import getOwner from 'ember-owner/get';
import sinon from 'sinon';

let dotsContainerComponent;

describe('Integration | Component | divider-dots-circle', function() {
  setupComponentTest('divider-dots-circle', {
    integration: true,
  });

  beforeEach(function () {
    const owner = getOwner(this);
    const dotsContainerComponentFactory = owner.factoryFor('component:divider-dots');

    dotsContainerComponent = dotsContainerComponentFactory.create();

    this.set('containerComponent', dotsContainerComponent);
  });

  describe('container component registration', function() {
    it('registers with its parent container component when inserted into the DOM', function() {
      const registrationSpy = sinon.spy(dotsContainerComponent, 'registerDotComponent');

      this.render(hbs`
        {{divider-dots-circle containerComponent=containerComponent}}
      `);

      expect(registrationSpy).to.have.been.calledOnce;
    });

    it('unregisters with its parent container component when removed from the DOM', function() {
      const unregistrationSpy = sinon.spy(dotsContainerComponent, 'unregisterDotComponent');

      this.set('showComponent', true);

      this.render(hbs`
        {{#if showComponent}}
          {{divider-dots-circle containerComponent=containerComponent}}
        {{/if}}
      `);

      this.set('showComponent', false);

      expect(unregistrationSpy).to.have.been.calledOnce;
    });
  });
});
