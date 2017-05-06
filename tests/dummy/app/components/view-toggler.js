import Component from 'ember-component';

export default Component.extend({
  tagName: '',

  isViewVisible: false,

  actions: {
    onViewToggled(ev) {
      ev.preventDefault();

      this.toggleProperty('isViewVisible');
    }
  }
});
