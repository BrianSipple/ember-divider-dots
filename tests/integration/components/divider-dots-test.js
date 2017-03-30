import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { find } from 'ember-native-dom-helpers';

let expected;
let actual;
let message;

describe.only('Integration | Component | divider-dots', function() {
  setupComponentTest('divider-dots', {
    integration: true
  });

  it('default inline rendering', function() {
    this.render(hbs`{{divider-dots}}`);

    const dividerDotsElem = find('.ember-divider-dots');

    expected = 4;
    actual = dividerDotsElem.querySelectorAll('.ember-divider-dots__dot').length;
    message = `4 "dots" are rendered by default`;

    expect(actual).to.equal(expected, message);
  });
});
