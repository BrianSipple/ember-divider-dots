# ember-divider-dots (WIP)

_A customizable Ember component for rendering SVG section dividers._

[![Latest NPM release][npm-badge]][npm-badge-url]
[![CircleCI Build Status][circle-badge]][circle-badge-url]
[![Test Coverage][coverage-badge]][coverage-badge-url]
[![Code Climate][codeclimate-badge]][codeclimate-badge-url]
[![Ember Observer Score][ember-observer-badge]][ember-observer-badge-url]
[![License][license-badge]][license-badge-url]
[![Dependencies][dependencies-badge]][dependencies-badge-url]
[![Dev Dependencies][devDependencies-badge]][devDependencies-badge-url]


## Installation

```sh
ember install ember-divider-dots
```

## Usage

### Container Component Attributes
-   `numDots`
    -     The number of dots to render as the divider.
    -     type: `Integer`
    -     default: `4`

-   `containerWidth`
    -     A value accepted by the SVG `width` attribute.
    -     type: `String`
    -     default: `'100%'`

-   `containerHeight`
    -     A value accepted by the SVG `height` attribute.
    -     type: `String`
    -     default: `'100%'`

-   `direction`
    -     Layout direction of the dots (AKA "flow" direction).
    -     type: `String`
    -     options: `horizontal`, `vertical`
    -     default: `horizontal`

-   `dotType`
    -     The type of SVG to render as a "dot". (Currently, only "circle" is supported).
    -     type: `String`
    -     options: `circle`
    -     default: `circle`

-   `dotCrossSizePct`
    -     The size of each dot as a percentage of the cross size ("cross size" being the amount of space in the direction opposite the layout direction)
    -     type: `Number`
    -     default: `100`

-   `gutterSizePct`
    -     The size of each gutter (the space between two dots), given as a percentage of the `dotSize`.
          
          **Note**: This will have no effect when `justify` is set to `between`, as the gutter space will be automatically distributed.

    -     type: `Number`
    -     default: `125`

-   `fill`
    -     Binding for the SVG `fill` attribute.
    -     type: `String`
    -     default: `currentColor`

-   `justify`
    -     The alignment of each dot along its main axis.
    -     options: `start`, `center`, `end`, `between`
    -     type: `String`
    -     default: `center`

## Background

Section dividers are a nice touch for many types of page layouts. However, there are also so many different ways to design them and even more (often-less-than-ideal) ways to implement those designs. 


## Contributing

### Setup

-   `git clone <repository-url>` this repository
-   `cd ember-divider-dots`
-   `npm install`
-   `bower install`

### Running

-   `ember serve`
-   Visit your app at [http://localhost:4200](http://localhost:4200).

### Running Tests

-   `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
-   `ember test`
-   `ember test --server`

## Building

-   `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).


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
