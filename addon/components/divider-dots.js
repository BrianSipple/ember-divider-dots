import Component from 'ember-component';
import computed, { readOnly, notEmpty } from 'ember-computed';
import layout from '../templates/components/divider-dots';
import { assert } from 'ember-metal/utils';
import { A } from 'ember-array/utils';
import { scheduleOnce } from 'ember-runloop';

export default Component.extend({
  layout,
  tagName: 'svg',
  classNames: ['ember-divider-dots'],
  attributeBindings: ['containerWidth:width', 'containerHeight:height', 'xmlns', 'fill'],

  xmlns: 'http://www.w3.org/2000/svg',

  /**
   * Width of the outer (containing) SVG that our inner SVG will responsively
   * scale to fill.
   *
   * @property containerWidth
   * @type Number|String
   * @public
   * @default '100%'
   */
  containerWidth: '100%',

  /**
   * Height of the outer (containing) SVG that our inner SVG will responsively
   * scale to fill.
   *
   * @property containerHeight
   * @type Number|String
   * @public
   * @default '100%'
   */
  containerHeight: '100%',

  measuredContainerWidth: null,
  measuredContainerHeight: null,

  fill: 'currentColor',

  /**
   * The viewBox used by our inner SVG container. This provides a sort of
   * local viewport for sizing our dots, independent of the outer, wrapper SVG's
   * configurable size.
   *
   * @property viewBox
   * @type String
   * @private
   */
  viewBox: undefined,

  /**
   * @property dotType
   * @type {String}
   * @public
   * @default 'circle'
   */
  dotType: 'circle',

  /**
   * The size of each gutter (the space between two dots), given as a
   * percentage of the dot size.
   *
   * @property gutterSizePct
   * @type Integer
   * @public
   * @default 25
   */
  gutterSizePct: null,

  /**
   * The percentage of the height of the viewBox covered by each "dot".
   *
   * @property dotHeightPct
   * @type Integer
   * @public
   * @default 100
   */
  dotHeightPct: null,

  /**
   * The number of dots to render as the divider
   *
   * @property numDots
   * @type Integer
   * @public
   * @default 4
   */
  numDots: null,

  /**
   * The alignment of each dot along its main axis. Options include
   * `start`, 'end`, `center`, and `between`.
   *
   * @property justify
   * @type String
   * @public
   * @default 'center'
   */
  justify: 'center',

  init() {
    this._super(...arguments);

    this.dotComponents = A();
    this.numDots = this.numDots || 4;
    this.dotHeightPct = this.dotHeightPct || 100;
    this.gutterSizePct = this.gutterSizePct || 25;

    assert(`divider-dots must have a \`numDots\` property greater than 0`, this.numDots > 0);
    assert(`divider-dots must have a \`dotHeightPct\` property greater than 0`, this.dotHeightPct > 0);
  },

  didInsertElement() {
    this._super(...arguments);

    scheduleOnce('actions', this, '_setContainerSizes');
    scheduleOnce('actions', this, '_setViewBox');

    scheduleOnce('afterRender', this, '_setDotDisplay');
  },

  dotSize: computed('dotHeightPct', 'measuredContainerHeight', 'foo', {
    get() {
      const dotHeightPct = this.get('dotHeightPct');
      const measuredContainerHeight = this.get('measuredContainerHeight');

      return (dotHeightPct / 100) * measuredContainerHeight;
    }
  }).readOnly(),

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

  dotDistance: computed('numDots', 'contentWidth', {
    get() {
      return this.get('contentWidth') / this.get('numDots');
    }
  }),

  contentWidth: computed('numDots', 'dotSize', 'gutterSizePct', {
    get() {
      const numDots = this.get('numDots');
      const dotSize = this.get('dotSize');
      const gutterSizePct = this.get('gutterSizePct');

      const marginWidth = (numDots - 1) * gutterSizePct;

      return (numDots * dotSize) + marginWidth;
    }
  }),

  contentStartX: computed('contentWidth', 'justify', 'measuredContainerWidth', {
    get() {
      const justify = (this.get('justify') || 'center').toLowerCase();
      const contentWidth = this.get('contentWidth');
      const measuredContainerWidth = this.get('measuredContainerWidth');

      return {
        start: 0,
        end: measuredContainerWidth - contentWidth,
        center: (measuredContainerWidth / 2) - (contentWidth / 2),
        between: 0
      }[justify];
    }
  }),

  contentEndX: computed('contentWidth', 'justify', 'measuredContainerWidth', {
    get() {
      const justify = (this.get('justify') || 'center').toLowerCase();
      const contentWidth = this.get('contentWidth');
      const measuredContainerWidth = this.get('measuredContainerWidth');

      return {
        start: measuredContainerWidth - contentWidth,
        end: measuredContainerWidth,
        center: (measuredContainerWidth / 2) + (contentWidth / 2),
        between: measuredContainerWidth
      }[justify];
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
  }),

  registerDotComponent(dotComponent) {
    this.dotComponents.addObject(dotComponent);
  },

  unregisterDotComponent(dotComponent) {
    this.dotComponents.removeObject(dotComponent);
  },

  _setContainerSizes() {
    const { width: measuredWidth, height: measuredHeight } = this.element.getBoundingClientRect();

    this.set('measuredContainerWidth', measuredWidth);
    this.set('measuredContainerHeight', measuredHeight);
  },

  _setViewBox() {
    const measuredContainerWidth = this.get('measuredContainerWidth');
    const measuredContainerHeight = this.get('measuredContainerHeight');

    this.set('viewBox', `0 0 ${measuredContainerWidth} ${measuredContainerHeight}`);
  },

  _setDotDisplay() {
    const dotCoords = this.get('dotCoords');
    const dotSize = this.get('dotSize');
    const dotRadius = this.get('dotRadius');

    this.dotComponents.forEach((dotComponent, idx) => {
      dotComponent.setDisplayProperties({
        coords: dotCoords[idx],
        size: dotSize,
        radius: dotRadius
      });
    });
  }
});
