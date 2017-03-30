import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | divider-dots-circle', function() {
  setupComponentTest('divider-dots-circle', {
    integration: true
  });

  it('renders', function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#divider-dots-circle}}
    //     template content
    //   {{/divider-dots-circle}}
    // `);

    this.render(hbs`{{divider-dots-circle}}`);
    expect(this.$()).to.have.length(1);
  });
});
