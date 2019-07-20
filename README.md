# url-lib

[![version](https://img.shields.io/npm/v/url-lib.svg)](http://npm.im/url-lib)
[![downloads](https://img.shields.io/npm/dt/url-lib.svg)](http://npm-stat.com/charts.html?package=url-lib&from=2016-03-27)
![module formats: esm & cjs](https://img.shields.io/badge/module%20formats-esm%2C%20cjs-green.svg)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![license](https://img.shields.io/npm/l/url-lib.svg)](http://spdx.org/licenses/MIT)

[![Maintenance Status](https://img.shields.io/badge/status-maintained-brightgreen.svg)](https://github.com/benmvp/url-lib/pulse)
[![Build Status](https://travis-ci.org/benmvp/url-lib.svg?branch=master)](https://travis-ci.org/benmvp/url-lib)
[![Tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
[![Coverage Status](https://coveralls.io/repos/github/benmvp/url-lib/badge.svg?branch=master)](https://coveralls.io/github/benmvp/url-lib?branch=master)
[![Dependencies status](https://img.shields.io/david/benmvp/url-lib.svg)](https://david-dm.org/benmvp/url-lib#info=dependencies)
[![Dev Dependencies status](https://img.shields.io/david/dev/benmvp/url-lib.svg)](https://david-dm.org/benmvp/url-lib#info=devDependencies)
[![Greenkeeper badge](https://badges.greenkeeper.io/benmvp/url-lib.svg)](https://greenkeeper.io/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

[![Watch on GitHub](https://img.shields.io/github/watchers/benmvp/url-lib.svg?style=social)](https://github.com/benmvp/url-lib/watchers)
[![Star on GitHub](https://img.shields.io/github/stars/benmvp/url-lib.svg?style=social)](https://github.com/benmvp/url-lib/stargazers)
[![Tweet](https://img.shields.io/twitter/url/https/github.com/benmvp/url-lib.svg?style=social)](https://twitter.com/intent/tweet?text=Check%20out%20url-lib%20by%20%40benmvp!%0A%0Ahttps%3A%2F%2Fgithub.com%2Fbenmvp%2Furl-lib)

A simple, lightweight string utility for Node and browsers that supports serializing and parsing URLs and query strings.

The primary use case is for building string URLs with query parameters for the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) that is polyfilled in the browser via [`fetch`](https://github.com/github/fetch) and in Node via [`node-fetch`](https://github.com/bitinn/node-fetch) libraries. [`isomorphic-fetch`](https://github.com/matthew-andrews/isomorphic-fetch) combines the two.

`url-lib` is derived from the [`Uize.Url`](https://github.com/UIZE/UIZE-JavaScript-Framework/blob/master/site-source/js/Uize/Url.js) module that is a part of the open-source [UIZE JavaScript Framework](https://github.com/UIZE/UIZE-JavaScript-Framework). It is stable, [dependency-free](https://david-dm.org/benmvp/url-lib#info=dependencies), [heavily-tested](https://coveralls.io/github/benmvp/url-lib?branch=master) and [well-documented](docs/).

## Installation

Install via [npm](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```sh
npm install --save url-lib
```

Install via [Yarn](https://yarnpkg.com/lang/en/docs/managing-dependencies/):

```sh
yarn add url-lib
```

Use with [Node](https://nodejs.org/en/), [webpack](https://webpack.github.io/) or [browserify](http://browserify.org/):

```js
import * as urllib from 'url-lib'; // ES6+
var urllib = require('url-lib'); // ES5-
```

## Usage

```js
import {formatUrl} from 'url-lib'

const url = formatUrl('http://www.benmvp.com/search?sort=recent&results=20&pg=1', {
    sort: 'popular',        // overwrites existing `sort` param in URL
    category: 'holiday',
    type: 'all',
    results: 100,            // overwrites existing `results` param in URL
})
```

With the above code, `url` will be `'http://www.benmvp.com/search?sort=popular&results=100&pg=1&category=holiday&type=all'`

Check out the [docs](docs/) for more usage examples or [try out `url-lib` in your browser!](https://runkit.com/npm/url-lib)

## API Docs

- [`formatQuery`](docs/formatQuery.md) - Serializes the properties of a params object to produce a URL query string.
- [`formatUrl`](docs/formatUrl.md) - Serializes the specified URL path with properties of a params object to produce a URL.
- [`parseQuery`](docs/parseQuery.md) - Parses query parameters from a string, returning the query parameters as an object.
- [`getCacheDefeatStr`](docs/getCacheDefeatStr.md) - Returns a string value (generated using the time and a random number) that can be used as a query parameter value to cause a URL to be unique in order to defeat caching.
- [`parseUrl`](docs/parseUrl.md) - Parses the specified URL string into an object containing properties for the various logical segments.

## Contributing

Contributions are welcome! See [CONTRIBUTING](CONTRIBUTING.md) for more details.

## Project philosophy

We take the stability of this utility package **very** seriously. `url-lib` follows the [SemVer](http://semver.org/) standard for versioning.

All updates must pass the [CI build](https://travis-ci.org/benmvp/url-lib) while maintaining [100% code coverage](https://coveralls.io/github/benmvp/url-lib).

## License

[MIT](LICENSE). Copyright (c) 2016- Ben Ilegbodu.
