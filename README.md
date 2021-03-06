# ember-divider-dots

_A customizable Ember component for rendering SVG section dividers._

[![Latest NPM release][npm-badge]][npm-badge-url]
[![CircleCI Build Status][circle-badge]][circle-badge-url]
<!--[![Test Coverage][coverage-badge]][coverage-badge-url]-->
<!--[![Code Climate][codeclimate-badge]][codeclimate-badge-url]-->
[![Ember Observer Score][ember-observer-badge]][ember-observer-badge-url]
[![License][license-badge]][license-badge-url]
[![Dependencies][dependencies-badge]][dependencies-badge-url]
[![Dev Dependencies][devDependencies-badge]][devDependencies-badge-url]


## Installation

```sh
ember install ember-divider-dots
```

## Usage

For usage tips _and_ visible examples, check out the [Ember Divider Dots demo app](https://briansipple.github.io/ember-divider-dots).

### Container Component Attributes
-   `numDots`
    -   The number of dots to render as the divider.
    -   type: `Integer`
    -   default: `4`

-   `lineWidth`
    -   A value accepted by the SVG `width` attribute.
    -   type: `String`
    -   default: `'100%'`

-   `lineHeight`
    -   A value accepted by the SVG `height` attribute.
    -   type: `String`
    -   default: `'100%'`

-   `direction`
    -   Layout direction of the dots (AKA "flow" direction).
    -   type: `String`
    -   options: `horizontal`, `vertical`
    -   default: `horizontal`

-   `dotType`
    -   The type of SVG to render as a "dot" (see the [demo page] for visual representations).
    -   type: `String`
    -   options: `circle`, `square`
    -   default: `circle`

-   `crossSizePct`
    -   The size of each dot as a percentage of the cross size ("cross size" being the amount of space in the direction opposite the layout direction)
    -   type: `Number`
    -   default: `100`

-   `gapSizePct`
    -   The size of each gutter (the space between two dots), given as a percentage of the `dotSize`.
          
          **Note**: This will have no effect when `justify` is set to `between`, as the gutter space will be automatically distributed.

    -   type: `Number`
    -   default: `125`

-   `fill`
    -   Binding for the SVG `fill` attribute.
    -   type: `String`
    -   default: `currentColor`

-   `justify`
    -   The alignment of each dot along its main axis.
    -   options: `start`, `center`, `end`, `between`
    -   type: `String`
    -   default: `center`

## Background
Section divider "dots" are a common design pattern, and they can add a nice touch
to long, content-heavy pages.

But implementing them is tough!

There's a wide variety of ways to approach their markup and styling,
and if you want to use SVG (good for you!), the calculus for sizing and positioning
gets even more involved.

And so as simple as they seem, divider dots are often overlooked.

That's where Ember Divider Dots comes in. The addon provides an easy-to-use, easy-to-configure component that generates
a line of "dots" as crisp SVGs wherever you choose to place it.

## Contributing

### Dot Type Requests

If you have a request for a new dot type, please feel free to [open up an issue](https://github.com/BrianSipple/ember-divider-dots.git/issues) for it.

### Developing 

#### Setup

-   `git clone <repository-url>` this repository
-   `cd ember-divider-dots`
-   `npm install`
-   `bower install`

#### Running

-   `ember serve`
-   Visit your app at [http://localhost:4200](http://localhost:4200).

#### Running Tests

-   `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
-   `ember test`
-   `ember test --server`

#### Building

-   `ember build`


[npm-badge]: https://img.shields.io/npm/v/ember-divider-dots.svg
[npm-badge-url]: https://www.npmjs.com/package/ember-divider-dots
[circle-badge]: https://circleci.com/gh/BrianSipple/ember-divider-dots/tree/master.svg?style=svg&circle-token={{CIRCLE_TOKEN}}
[circle-badge-url]: https://circleci.com/gh/BrianSipple/ember-divider-dots/tree/master
[codeclimate-badge]: https://img.shields.io/codeclimate/github/BrianSipple/ember-divider-dots.svg
[codeclimate-badge-url]: https://codeclimate.com/github/BrianSipple/ember-divider-dots
[coverage-badge]: https://codeclimate.com/repos/580452d5c451cf0072003bc5/badges/fe9856d5b427c83eec3c/coverage.svg
[coverage-badge-url]: https://codeclimate.com/repos/580452d5c451cf0072003bc5/coverage
[ember-observer-badge]: http://emberobserver.com/badges/ember-divider-dots.svg
[ember-observer-badge-url]: http://emberobserver.com/addons/ember-divider-dots
[license-badge]: https://img.shields.io/npm/l/ember-divider-dots.svg
[license-badge-url]: ./LICENSE
[dependencies-badge]: https://img.shields.io/david/BrianSipple/ember-divider-dots.svg
[dependencies-badge-url]: https://david-dm.org/BrianSipple/ember-divider-dots
[devDependencies-badge]: https://img.shields.io/david/dev/BrianSipple/ember-divider-dots.svg
[devDependencies-badge-url]: https://david-dm.org/BrianSipple/ember-divider-dots#info=devDependencies
