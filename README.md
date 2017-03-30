# ember-divider-dots (WIP)

_A customizable Ember component for rendering SVG section dividers._

## Installation

```sh
ember install ember-divider-dots
```

## Usage

### Container SVG Attributes

* `width`
  - A value accepted by the SVG `width` attribute.
  - default: 100% (You probably won't want to change this)

* `height`
  - A value accepted by the SVG `width` attribute.

### "Dot" SVG Attributes
* `dotSize`
* `gutterSize`
* `justify`
* `fill`
* `dotType`
  - circle
  - rect

📋 TODO: Explore yielding back an interface for custom content here?

## Background

Section dividers are a nice touch for many types of page layouts. However, there are also so many different ways to design them and even more (often-less-than-ideal) ways to implement those designs. 



## Contributing

### Setup

* `git clone <repository-url>` this repository
* `cd ember-divider-dots`
* `npm install`
* `bower install`

### Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
