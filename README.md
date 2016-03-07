# image-puzzle [![Build Status](https://travis-ci.org/Nexxa/image-puzzle.svg)](https://travis-ci.org/Nexxa/image-puzzle)

Javascript image puzzle game.

Check out example [here](http://nexxa.github.io/image-puzzle/).

**image-puzzle** uses [Ramda](http://ramdajs.com/) for functional programming stuff and [virtual-dom](https://github.com/Matt-Esch/virtual-dom) for rendering.

**Disclaimer:** the module is fully written with ES6 syntax and there isn't a "dist" ES5-transpiled version.

## API

### `imagePuzzle(image, [opts, onResolution])`
```javascript
/**
 * Creates a new Image Puzzle object.
 *
 * @param  {HTMLImageElement} [image=null]   - Image html element
 * @param  {object}           [opts]         - Configuration
 * @param  {function}         [onResolution] - Callback on puzzle resolution
 * @return {object} Image Puzzle object
 */
```
Configuration object:
```javascript
{
  rows: <Number>, // Number of rows - Default 3
  cols: <Number>, // Number of columns - Default 3
  pairs: <Array>  // Data loaded from another source (localStorge, ajax etc) - Default null
}
```

#### `imagePuzzle.config([sources])`
```javascript
/**
 * Gets or sets image puzzle configuration.
 *
 * @param  {array} [sources=[]] - Objects to merge with configuration
 * @return {object} Configuration object
 */
```

#### `imagePuzzle.update()`
```javascript
/**
* Updates the puzzle pieces.
*
* @return {object} Puzzle data object
*/
```

#### `imagePuzzle.state([asString])`
```javascript
/**
* Gets the current game state as simple object or JSON string.
*
* @param  {boolean} [asString=false] - If true gets the stringify version of state object
* @return {[object|string]} Game state object or string -> {rows, cols, data}
*/
```

#### `imagePuzzle.rebuild(rows, cols)`
```javascript
/**
 * Rebuilds the puzzle with specified rows and colums.
 *
 * @param  {number} rows - Number of rows
 * @param  {number} cols - Number of columns
 * @return {object} Puzzle data object
 */
```

## Quick start
```html
<div id="puzzle">
  <img src="my-image.jpg" alt="image" id="puzzle-img">
</div>

<button type="button" id="update">Update</button>
<button type="button" id="rebuild">Rebuild</button>
<button type="button" id="save">Save</button>

<script>
  // Pick an image
  const image = document.getElementById('puzzle-img');
  // Init puzzle with  4x4 grid and with alert on resolution
  const puzzle = imagePuzzle(image, {rows: 4, cols: 4}, () => alert('Puzzle resolved!'));

  // Update the puzzle
  document.getElementById('update').addEventListener('click', () => puzzle.update());

  // Rebuild the puzzle with a 3x3 grid
  document.getElementById('rebuild').addEventListener('click', () => puzzle.rebuild(3, 3));

  // Show in console the current puzzle state as stringify JSON
  document.getElementById('save').addEventListener('click', () => console.log(puzzle.state(true)));
</script>
```

## Contributing

This repository follow the [git-flow](http://nvie.com/posts/a-successful-git-branching-model/) branching model and the [semver](http://semver.org/) specification for versioning.

There are some little script to help development and code management:

- `start` will open the default browser and runs `serve` which starts a simple http-server, so you can navigate to */examples* directory;
- before `serve` the `bundle.js` file is removed from */examples* directory and a new version is created through `browserify`;
- `test` runs unit tests (both on javascript API and browser) after linting;
- `watch` updates `bundles.js` when `image-puzzle.js` changes;
- you can run individually `clean` for cleaning, `lint` for linting and `example` to build `bundle.js`.
