import Component from 'ember-component';
import computed, { equal } from 'ember-computed';
import layout from '../templates/components/divider-dots';
import { assert } from 'ember-metal/utils';
import { A } from 'ember-array/utils';
import { scheduleOnce } from 'ember-runloop';
import { DIRECTION_HORIZONTAL, DIRECTION_VERTICAL } from 'ember-divider-dots/utils/directions';
import { JUSTIFICATION_BETWEEN, JUSTIFICATION_CENTER, justifications } from 'ember-divider-dots/utils/justification';
import { DOT_TYPE_CIRCLE, DOT_TYPE_SQUARE, dotTypes } from 'ember-divider-dots/utils/dot-types';
import set from 'ember-metal/set';
import range from 'ember-divider-dots/utils/range';

export default Component.extend({
  layout,
  tagName: 'svg',
  classNames: ['ember-divider-dots-container'],
  attributeBindings: [
    'lineWidth:width',
    'lineHeight:height',
    'xmlns',
    'fill',
    'stroke',
    'stroke-width'
  ],

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
   * @property lineWidth
   * @type Number|String
   * @public
   * @default '100%'
   */
  lineWidth: '100%',

  /**
   * Height of the outer (containing) SVG that our inner SVG will responsively
   * scale to fill.
   *
   * @property lineHeight
   * @type Number|String
   * @public
   * @default '100%'
   */
  lineHeight: '100%',

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
   * @property measuredlineWidth
   * @type Number
   * @private
   */
  measuredlineWidth: null,

  /**
   * @property measuredlineHeight
   * @type Number
   * @private
   */
  measuredlineHeight: null,

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
  dotType: DOT_TYPE_CIRCLE,

  /**
   * The size of each gutter (the space between two dots), given as a
   * percentage of the dot size.
   *
   * @property gapSizePct
   * @type Number
   * @public
   * @default 125
   */
  gapSizePct: null,

  /**
   * The percentage of the height of the viewBox covered by each "dot".
   *
   * @property crossSizePct
   * @type Integer
   * @public
   * @default 100
   */
  crossSizePct: null,

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
  justify: JUSTIFICATION_CENTER,

  init() {
    this._super(...arguments);

    this.dotComponents = A();
    this.numDots = this.numDots || 4;
    this.crossSizePct = this.crossSizePct || 100;
    this.gapSizePct = this.gapSizePct || 125;

    this._checkInitProperties();
  },

  didInsertElement() {
    this._super(...arguments);

    scheduleOnce('actions', this, '_setContainerSizes');
    scheduleOnce('actions', this, '_setViewBox');

    scheduleOnce('afterRender', this, '_setDotDisplay');
  },

  /**
   * Take the length opposite the direction of the flow (the "cross size"),
   * and multiply it by the "crossSizePct"
   */
  dotSize: computed('crossSizePct', 'direction', 'measuredlineHeight', 'measuredlineWidth', function() {
    const crossSizePct = this.get('crossSizePct');
    const layoutDirection = this.get('direction');
    const multiplier = layoutDirection === DIRECTION_HORIZONTAL ? this.get('measuredlineHeight') : this.get('measuredlineWidth');

    return (crossSizePct / 100) * multiplier;
  }).readOnly(),

  layoutFlowSpace: computed('direction', 'measuredlineHeight', 'measuredlineWidth', function() {
    const layoutDirection = this.get('direction');

    return layoutDirection === DIRECTION_HORIZONTAL ? this.get('measuredlineWidth') : this.get('measuredlineHeight');
  }).readOnly(),

  dotRadius: computed('dotSize', function() {
    return this.get('dotSize') / 2;
  }).readOnly(),

  dotComponent: computed('dotType', function() {
    const dotType = this.get('dotType');

    return {
      [DOT_TYPE_CIRCLE]: 'divider-dots-circle',
      [DOT_TYPE_SQUARE]: 'divider-dots-square'
    }[(dotType || 'circle').toLowerCase()];
  }).readOnly(),

  autoSizeGutters: equal('justify', JUSTIFICATION_BETWEEN),

  gutterCount: computed('numDots', function() {
    return this.get('numDots') - 1;
  }).readOnly(),

  /**
   * The total amount of space OCCUPIED by all dots in the set
   */
  dotSpace: computed('numDots', 'dotSize', function() {
    return this.get('numDots') * this.get('dotSize');
  }).readOnly(),

  /**
   * The amount of space OCCUPIED by a gap between two dots in the set
   */
  gutterSize: computed('dotSpace', 'layoutFlowSpace', 'gapSizePct', 'autoSizeGutters', function() {
    const dotSize = this.get('dotSize');
    const dotSpace = this.get('dotSpace');
    const layoutFlowSpace = this.get('layoutFlowSpace');
    const gutterCount = this.get('gutterCount');
    const autoSizeGutters = this.get('autoSizeGutters');
    const gapSizePct = this.get('gapSizePct');

    if (autoSizeGutters) {
      return (layoutFlowSpace - dotSpace) / gutterCount;
    }

    return dotSize * (gapSizePct / 100);
  }).readOnly(),

  /**
   * The total amount of space OCCUPIED by the gaps between the set's dots
   */
  gutterSpace: computed('gutterSize', function() {
    return this.get('gutterCount') * this.get('gutterSize');
  }).readOnly(),

  /**
   * The total amount of space COVERED by the set's dots
   */
  contentSpace: computed('dotSpace', 'gutterSpace', function() {
    const dotSpace = this.get('dotSpace');
    const gutterSpace = this.get('gutterSpace');

    return dotSpace + gutterSpace;
  }).readOnly(),

  dotDistanceApart: computed('dotSize', 'gutterSize', function() {
    return this.get('dotSize') + this.get('gutterSize');
  }).readOnly(),

  contentStartCoord: computed('contentSpace', function() {
    const justify = this.get('justify').toLowerCase();
    const contentSpace = this.get('contentSpace');
    const layoutFlowSpace = this.get('layoutFlowSpace');

    return {
      start: 0,
      end: layoutFlowSpace - contentSpace,
      center: (layoutFlowSpace / 2) - (contentSpace / 2),
      between: 0
    }[justify];
  }).readOnly(),

  /**
   * List of coordinate data for each dot -- which can then be
   * passed to its corresponding component.
   */
  dotCoords: computed('contentStartCoord', 'dotDistanceApart', {
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
          centerX: direction === DIRECTION_HORIZONTAL ? left + dotRadius : '50%',
          centerY: direction === DIRECTION_VERTICAL ? top + dotRadius : '50%'
        };
      });
    }
  }).readOnly(),

  dotRange: computed('numDots', function() {
    return range(1, this.get('numDots'));
  }),

  registerDotComponent(dotComponent) {
    this.dotComponents.addObject(dotComponent);
  },

  unregisterDotComponent(dotComponent) {
    this.dotComponents.removeObject(dotComponent);
  },

  _setContainerSizes() {
    const { width: measuredWidth, height: measuredHeight } = this.element.getBoundingClientRect();

    set(this, 'measuredlineWidth', measuredWidth);
    set(this, 'measuredlineHeight', measuredHeight);
  },

  _setViewBox() {
    const measuredlineWidth = this.get('measuredlineWidth');
    const measuredlineHeight = this.get('measuredlineHeight');

    set(this, 'viewBox', `0 0 ${measuredlineWidth} ${measuredlineHeight}`);
  },

  _setDotDisplay() {
    const dotCoords = this.get('dotCoords');
    const dotSize = this.get('dotSize');

    this.dotComponents.forEach((dotComponent, idx) => {
      dotComponent.setDisplayProperties({
        coords: dotCoords[idx],
        crossSize: dotSize
      });
    });
  },

  _checkInitProperties() {
    const dotTypeMessage = `divider-dots must have a \`dotType\` matching either ${dotTypes.slice(0, -1).join(', ')}, or ${dotTypes.slice(-1)}`;
    const numDotsMessage = `divider-dots must have a \`numDots\` property greater than 0`;
    const dotCrossSizeMessage = `divider-dots must have a \`crossSizePct\` property greater than 0`;
    const justifyMessage = `divider-dots must have a \`justify\` property matching either ${justifications.slice(0, -1).join(', ')}, or ${justifications.slice(-1)}`;

    assert(dotTypeMessage, dotTypes.includes(this.dotType));
    assert(numDotsMessage, this.numDots > 0);
    assert(dotCrossSizeMessage, this.crossSizePct > 0);
    assert(justifyMessage, justifications.includes(this.justify));
  }
});
