import Component from 'ember-component';
import computed from 'ember-computed';
import layout from '../templates/components/divider-dots';
import { assert } from 'ember-metal/utils';
import { A } from 'ember-array/utils';
import { scheduleOnce } from 'ember-runloop';
import { DIRECTION_HORIZONTAL, DIRECTION_VERTICAL } from 'ember-divider-dots/utils/directions';

export default Component.extend({
  layout,
  tagName: 'svg',
  classNames: ['ember-divider-dots-container'],
  attributeBindings: ['containerWidth:width', 'containerHeight:height', 'xmlns', 'fill'],

  xmlns: 'http://www.w3.org/2000/svg',

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

  /**
   * Layout direction of the dots (AKA "flow" direction).
   *
   * @property direction
   * @type String
   * @public
   * @default 'horizontal'
   */
  direction: DIRECTION_HORIZONTAL,

  /**
   * @property measuredContainerWidth
   * @type Number
   * @private
   */
  measuredContainerWidth: null,

  /**
   * @property measuredContainerHeight
   * @type Number
   * @private
   */
  measuredContainerHeight: null,

  /**
   * Binding for the SVG `fill` attribute.
   *
   * @property fill
   * @type String
   * @public
   * @default 'currentColor'
   */
  fill: 'currentColor',

  /**
   * The type of SVG to render as a "dot".
   *
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
   * @type Number
   * @public
   * @default 25
   */
  gutterSizePct: null,

  /**
   * The percentage of the height of the viewBox covered by each "dot".
   *
   * @property dotCrossSizePct
   * @type Integer
   * @public
   * @default 100
   */
  dotCrossSizePct: null,

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
   * The alignment of each dot along its main axis.
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
    this.dotCrossSizePct = this.dotCrossSizePct || 100;
    this.gutterSizePct = this.gutterSizePct || 25;

    assert(`divider-dots must have a \`numDots\` property greater than 0`, this.numDots > 0);
    assert(`divider-dots must have a \`dotCrossSizePct\` property greater than 0`, this.dotCrossSizePct > 0);
  },

  didInsertElement() {
    this._super(...arguments);

    scheduleOnce('actions', this, '_setContainerSizes');
    scheduleOnce('actions', this, '_setViewBox');

    scheduleOnce('afterRender', this, '_setDotDisplay');
  },

  dotSize: computed('dotCrossSizePct', 'direction', 'measuredContainerHeight', 'measuredContainerWidth', {
    get() {
      const dotCrossSizePct = this.get('dotCrossSizePct');
      const layoutDirection = this.get('direction');
      const multiplier = layoutDirection === DIRECTION_HORIZONTAL ? this.get('measuredContainerHeight') : this.get('measuredContainerWidth');

      return (dotCrossSizePct / 100) * multiplier;
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

  dotDistanceApart: computed('numDots', 'contentSize', {
    get() {
      return this.get('contentSize') / this.get('numDots');
    }
  }),

  contentSize: computed('numDots', 'dotSize', 'gutterSizePct', 'direction', {
    get() {
      const numDots = this.get('numDots');
      const dotSize = this.get('dotSize');
      const gutterSizePct = this.get('gutterSizePct');

      const marginWidth = (numDots - 1) * gutterSizePct;

      return (numDots * dotSize) + marginWidth;
    }
  }).readOnly(),

  layoutFlowSpace: computed('direction', 'measuredContainerHeight', 'measuredContainerWidth', {
    get() {
      const layoutDirection = this.get('direction');

      return layoutDirection === DIRECTION_HORIZONTAL ? this.get('measuredContainerWidth') : this.get('measuredContainerHeight');
    }
  }).readOnly(),

  contentStartCoord: computed('contentSize', 'justify', 'layoutFlowSpace', {
    get() {
      const justify = (this.get('justify') || 'center').toLowerCase();
      const contentSize = this.get('contentSize');
      const layoutFlowSpace = this.get('layoutFlowSpace');

      return {
        start: 0,
        end: layoutFlowSpace - contentSize,
        center: (layoutFlowSpace / 2) - (contentSize / 2),
        between: 0
      }[justify];
    }
  }).readOnly(),

  contentEndCoord: computed('contentSize', 'justify', 'layoutFlowSpace', {
    get() {
      const justify = (this.get('justify') || 'center').toLowerCase();
      const contentSize = this.get('contentSize');
      const layoutFlowSpace = this.get('layoutFlowSpace');

      return {
        start: layoutFlowSpace - contentSize,
        end: layoutFlowSpace,
        center: (layoutFlowSpace / 2) + (contentSize / 2),
        between: layoutFlowSpace
      }[justify];
    }
  }).readOnly(),

  /**
   * List of coordinate data for each dot -- which can then be
   * passed to its corresponding component.
   */
  dotCoords: computed('contentStartCoord', 'contentEndCoord', 'dotDistanceApart', {
    get() {
      const numDots = this.get('numDots');
      const dotSize = this.get('dotSize');
      const dotRadius = this.get('dotRadius');
      const startCoord = this.get('contentStartCoord');
      const dotDistanceApart = this.get('dotDistanceApart');
      const direction = this.get('direction');

      return Array.from({ length: numDots }, (_, idx) => {
        const distanceInFlow = startCoord + (idx * dotDistanceApart);

        const left = direction === DIRECTION_HORIZONTAL ? distanceInFlow : 0;
        const top = direction === DIRECTION_VERTICAL ? distanceInFlow : 0;

        return {
          left,
          top,
          right: left + dotSize,
          bottom: top + dotSize,
          centerX: left + dotRadius,
          centerY: top + dotRadius
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
