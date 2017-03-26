import Component from 'ember-component';
import computed from 'ember-computed';
import layout from '../templates/components/divider-dots';
import { assert } from 'ember-metal/utils';

export default Component.extend({
  layout,
  tagName: 'svg',
  attributeBindings: ['width', 'height', 'xmlns', 'fill'],

  xmlns: 'http://www.w3.org/2000/svg',
  width: '100%',
  height: '100%',
  fill: 'currentColor',

  dotType: 'circle',

  gutterSize: null,
  dotSize: null,
  numDots: null,
  justify: 'center',


  init() {
    this._super(...arguments);

    this.numDots = this.numDots || 3;
    this.dotSize = this.dotSize || 20;
    this.gutterSize = this.gutterSize || 0;

    assert(`divider-dots must have a \`numDots\` property greater than 0`, this.numDots > 0);
    assert(`divider-dots must have a \`dotSize\` property greater than 0`, this.dotSize > 0);
  },

  // viewBoxLength: computed('gutterSize', 'numDots', 'dotRadius', {
  //   get() {
  //     const numDots = get(this, 'numDots');
  //     const gutterSize = get(this, 'gutterSize');
  //     const dotRadius = get(this, 'dotRadius');

  //     return (
  //       (gutterSize * (numDots - 1)) +
  //       (dotRadius * (numDots - 1))
  //     );
  //   }
  // }),

  // viewBox: computed('viewBoxLength', 'dotRadius', {
  //   get() {
  //     const viewBoxLength = get(this, 'viewBoxLength');
  //     const dotRadius = get(this, 'dotRadius');

  //     return `0 0 ${viewBoxLength} ${dotRadius * 2}`;
  //   }
  // }),

  dotRadius: computed('dotSize', {
    get() {
      return this.get('dotSize') / 2;
    }
  }),

  dotComponent: computed('dotType', {
    get() {
      const dotType = this.get('dotType');

      return {
        circle: 'divider-dots-circle',
        rect: 'divider-dots-rect'
      }[(dotType || 'circle').toLowerCase()];
    }
  }).readOnly(),

  contentWidth: computed('numDots', 'dotSize', 'gutterSize', 'dotComponent', 'dotDistance', {
    get() {
      const numDots = this.get('numDots');
      const dotSize = this.get('dotSize');
      const gutterSize = this.get('gutterSize');

      const marginWidth = (numDots - 1) * gutterSize;

      return (numDots * dotSize) + marginWidth;
    }
  }),

  contentStartX: computed('contentWidth', 'justify', {
    get() {
      const justify = (this.get('justify') || 'center').toLowerCase();
      const contentWidth = this.get('contentWidth');

      return {
        start: 0,
        end: 100 - contentWidth,
        center: 50 - (contentWidth / 2),
        between: 0
      }[justify];
    }
  }),

  contentEndX: computed('contentWidth', 'justify', {
    get() {
      const justify = (this.get('justify') || 'center').toLowerCase();
      const contentWidth = this.get('contentWidth');

      return {
        start: contentWidth,
        end: 100,
        center: 50 + (contentWidth / 2),
        between: 100
      }[justify];
    }
  }),

  dotDistance: computed('numDots', 'contentWidth', {
    get() {
      return this.get('contentWidth') / this.get('numDots');
    }
  }),

  /**
   * List of coordinate data for each dot -- which can then be
   * passed to its corresponding component.
   */
  dotCoords: computed('contentStartX', 'contentEndX', 'dotDistance', {
    get() {
      const numDots = this.get('numDots');
      const dotSize = this.get('dotSize');
      const dotRadius = this.get('dotRadius');
      const startX = this.get('contentStartX');
      const dotDistance = this.get('dotDistance');

      return Array.from({ length: numDots }, (_, idx) => {
        const left = startX + (idx * dotDistance);

        return {
          left,
          right: left + dotSize,
          centerX: left + dotRadius,
          centerY: dotRadius
        };
      });
    }
  })
});
