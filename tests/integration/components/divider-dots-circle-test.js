import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('divider-dots-circle', 'Integration | Component | divider dots circle', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{divider-dots-circle}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#divider-dots-circle}}
      template block text
    {{/divider-dots-circle}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
