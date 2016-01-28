# image-puzzle [![Build Status](https://travis-ci.org/Nexxa/image-puzzle.svg)](https://travis-ci.org/Nexxa/image-puzzle)
Javascript random image puzzle game.

## Contributing

This repository follow the [git-flow](http://nvie.com/posts/a-successful-git-branching-model/) branching model and the [semver](http://semver.org/) specification for versioning.

There are some little script to help development and code management:

- `start` will open the default browser and runs `serve` which starts a simple http-server, so you can navigate to */examples* directory;
- before `serve` the `bundle.js` file is removed from */examples* directory and a new version is created through `browserify`;
- `test` runs unit tests (both on javascript API and browser) after linting;
- `watch` updates `bundles.js` when `image-puzzle.js` changes;
- you can run individually `clean` for cleaning, `lint` for linting and `example` to build `bundle.js`.
