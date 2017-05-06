import Component from 'ember-component';
import layout from '../templates/components/snippet-view-toggler';

export default Component.extend({
  layout,
  classNames: ['c-snippet-view-toggler'],

  snippetName: ''
});
