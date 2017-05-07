import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { find, findAll } from 'ember-native-dom-helpers';
import { DIRECTION_HORIZONTAL, DIRECTION_VERTICAL } from 'ember-divider-dots/utils/directions';
import { DOT_TYPE_CIRCLE, DOT_TYPE_SQUARE } from 'ember-divider-dots/utils/dot-types';
import testSelector from 'ember-test-selectors';

const DOM_SELECTORS = {
  CONTAINER_SVG_OUTER: '.ember-divider-dots-container',
  CONTAINER_SVG_INNER: '.ember-divider-dots-container__inner',
  DOT_SVG: '.ember-divider-dots-container__dot',
  CIRCLE_DOT: '.ember-divider-dots-dot--circle',
  SQUARE_DOT: '.ember-divider-dots-container__dot'
};

const TEST_SELECTORS = {
  DOT_TYPE: 'dot-type'
};

function getBBoxAttrForDots(dotElems, attrName) {
  return dotElems.map(dotElem => dotElem.getBBox()[attrName]);
}

let expected;
let actual;
let message;

describe('Integration | Component | divider-dots', function() {
  setupComponentTest('divider-dots', {
    integration: true
  });

  describe('Basic default rendering', function() {
    it('renders an inner SVG as a first child', function() {
      this.render(hbs`{{divider-dots}}`);

      const containerElemOuter = find(DOM_SELECTORS.CONTAINER_SVG_OUTER);
      const containerElemInner = containerElemOuter.firstElementChild;

      expected = true;
      actual = containerElemInner instanceof SVGElement;
      message = `inner SVG is present`;

      expect(actual).to.equal(expected, message);
    });

    it(`renders "dots" by default inside of its inner SVG`, function() {
      this.render(hbs`{{divider-dots}}`);

      const containerElemOuter = find(DOM_SELECTORS.CONTAINER_SVG_OUTER);

      expected = 4;
      actual = containerElemOuter.querySelectorAll(DOM_SELECTORS.DOT_SVG).length;
      message = `4 dots are rendered by default`;

      expect(actual).to.equal(expected, message);
    });

    it('block usage', function() {
      const template = hbs`
        {{#divider-dots}}
          🎮
        {{/divider-dots}}
      `;

      this.render(template);

      const containerElemInner = find(DOM_SELECTORS.CONTAINER_SVG_INNER);

      expected = '🎮';
      actual = containerElemInner.textContent.trim();
      message = `freeform content within the inner container SVG is enabled during block scope usage`;

      expect(actual).to.equal(expected, message);
    });
  });

  describe('core functionality', function() {
    const fixedContainerTemplate = hbs`
      <div style="width: 900px; height: 500px;">
        {{divider-dots direction=direction crossSizePct=crossSizePct}}
      </div>
    `;

    const DEFAULT_WIDTH_FIXED = 900;
    const DEFAULT_HEIGHT_FIXED = 500;

    describe('generating a viewBox', function() {
      it('generates a viewBox for its inner SVG based upon the width and height of its container', function() {
        this.render(fixedContainerTemplate);

        const containerElemInner = find(DOM_SELECTORS.CONTAINER_SVG_INNER);

        expected = `0 0 ${DEFAULT_WIDTH_FIXED} ${DEFAULT_HEIGHT_FIXED}`;
        actual = containerElemInner.getAttribute('viewBox');

        expect(actual).to.equal(expected);
      });
    });

    describe('Sizing dots according to layout direction', function() {
      const crossSizePct = 22;

      it(`defaults to sizing dots to fill the full amount of space in the direction opposite its layout \`direction\``, function() {
        this.set('direction', DIRECTION_HORIZONTAL);
        this.set('crossSizePct', undefined);

        this.render(fixedContainerTemplate);

        const dotElems = [...findAll(DOM_SELECTORS.DOT_SVG)];
        const dotElemHeights = getBBoxAttrForDots(dotElems, 'height');
        const expectedHeights = dotElems.map(() => DEFAULT_HEIGHT_FIXED);

        expect(dotElemHeights).to.deep.equal(expectedHeights);
      });

      it(`lays out dots horizontally and computes their height when \`direction\` is equal to \`${DIRECTION_HORIZONTAL}\``, function() {
        this.set('direction', DIRECTION_HORIZONTAL);
        this.set('crossSizePct', crossSizePct);

        this.render(fixedContainerTemplate);

        const dotElems = [...findAll(DOM_SELECTORS.DOT_SVG)];
        const dotElemHeights = getBBoxAttrForDots(dotElems, 'height');
        const expectedHeight = DEFAULT_HEIGHT_FIXED * (crossSizePct / 100);
        const expectedHeights = dotElems.map(() => expectedHeight);

        expect(dotElemHeights).to.deep.equal(expectedHeights);
      });

      it(`lays out dots vertically and computes their width when \`direction\` is equal to \`${DIRECTION_VERTICAL}\``, function() {
        this.set('direction', DIRECTION_VERTICAL);
        this.set('crossSizePct', crossSizePct);

        this.render(fixedContainerTemplate);

        const dotElems = [...findAll(DOM_SELECTORS.DOT_SVG)];
        const dotElemWidths = getBBoxAttrForDots(dotElems, 'width');
        const expectedWidth = DEFAULT_WIDTH_FIXED * (crossSizePct / 100);
        const expectedWidths = dotElems.map(() => expectedWidth);

        expect(dotElemWidths).to.deep.equal(expectedWidths);
      });
    });
  });


  describe('API', function() {
    const template = hbs`{{divider-dots dotType=dotType numDots=numDots}}`;

    describe('justification', function() {
      it('justifies dots along the center of the container when `center` justification is set', function() {
      });
    });

    describe('dotType', function() {
      const NUM_DOTS = 5;

      beforeEach(function() {
        this.set('numDots', NUM_DOTS);
      });

      it(`uses \`divider-dots-circle\` components as "dots" when a \`dotType\` of \`${DOT_TYPE_CIRCLE}\` is set`, function() {
        this.set('dotType', DOT_TYPE_CIRCLE);
        this.render(template);

        const dotSetElem = find(DOM_SELECTORS.CONTAINER_SVG_OUTER);

        expect(findAll(testSelector(TEST_SELECTORS.DOT_TYPE, 'circle'), dotSetElem).length).to.equal(NUM_DOTS);
      });

      it(`uses \`divider-dots-square\` components as "dots" when a \`dotType\` of \`${DOT_TYPE_SQUARE}\` is set`, function() {
        this.set('dotType', DOT_TYPE_SQUARE);
        this.render(template);

        const dotSetElem = find(DOM_SELECTORS.CONTAINER_SVG_OUTER);

        expect(findAll(testSelector(TEST_SELECTORS.DOT_TYPE, 'square'), dotSetElem).length).to.equal(NUM_DOTS);
      });
    });
  });
});
