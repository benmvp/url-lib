# url-lib

[![version](https://img.shields.io/npm/v/url-lib.svg)](http://npm.im/url-lib)
[![downloads](https://img.shields.io/npm/dt/url-lib.svg)](http://npm-stat.com/charts.html?package=url-lib&from=2016-03-27)
![module formats: umds](https://img.shields.io/badge/module%20formats-umd-green.svg)
[![license](https://img.shields.io/npm/l/url-lib.svg)](http://spdx.org/licenses/MIT)

[![Maintenance Status](https://img.shields.io/badge/status-maintained-brightgreen.svg)](https://github.com/benmvp/url-lib/pulse)
[![Build Status](https://travis-ci.org/benmvp/url-lib.svg?branch=master)](https://travis-ci.org/benmvp/url-lib)
[![Coverage Status](https://coveralls.io/repos/github/benmvp/url-lib/badge.svg?branch=master)](https://coveralls.io/github/benmvp/url-lib?branch=master)
[![Dependencies status](https://img.shields.io/david/benmvp/url-lib.svg)](https://david-dm.org/benmvp/url-lib#info=dependencies)
[![Dev Dependencies status](https://img.shields.io/david/dev/benmvp/url-lib.svg)](https://david-dm.org/benmvp/url-lib#info=devDependencies)

[![Watch on GitHub](https://img.shields.io/github/watchers/benmvp/url-lib.svg?style=social)](https://github.com/benmvp/url-lib/watchers)
[![Star on GitHub](https://img.shields.io/github/stars/benmvp/url-lib.svg?style=social)](https://github.com/benmvp/url-lib/stargazers)
[![Tweet](https://img.shields.io/twitter/url/https/github.com/benmvp/url-lib.svg?style=social)](https://twitter.com/intent/tweet?text=Check%20out%20url-lib!%20https://github.com/benmvp/url-lib%20%F0%9F%91%8D)

A simple, lightweight string utility for Node and browsers that supports serializing and parsing URLs and query strings.

The primary use case is for building string URLs with query parameters for the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) that is polyfilled in the browser via [`fetch`](https://github.com/github/fetch) and in Node via [`node-fetch`](https://github.com/bitinn/node-fetch) libraries. [`isomorphic-fetch`](https://github.com/matthew-andrews/isomorphic-fetch) combines the two.

`url-lib` is derived from the [`Uize.Url`](https://github.com/UIZE/UIZE-JavaScript-Framework/blob/master/site-source/js/Uize/Url.js) module that is a part of the open-source [UIZE JavaScript Framework](https://github.com/UIZE/UIZE-JavaScript-Framework). It is stable, [dependency-free](https://david-dm.org/benmvp/url-lib#info=dependencies), [heavily-tested](https://coveralls.io/github/benmvp/url-lib?branch=master), [well-documented](docs/), and **under 800B** when [minified](https://raw.githubusercontent.com/benmvp/url-lib/master/dist/url-lib-core.min.js) & [gzipped](https://github.com/benmvp/url-lib/blob/master/dist/url-lib-core.min.js.gz).

## Installation

Install via [NPM](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```sh
npm install --save url-lib
```

Use with [Node](https://nodejs.org/en/), [webpack](https://webpack.github.io/) or [browserify](http://browserify.org/):

```js
import * as urllib from 'url-lib'; // ES6+
var urllib = require('url-lib'); // ES5-
```

As a last resort, you can download [`dist/url-lib.min.js`](https://raw.githubusercontent.com/benmvp/url-lib/master/dist/url-lib.min.js) (or just [`dist/url-lib-core.min.js`](https://raw.githubusercontent.com/benmvp/url-lib/master/dist/url-lib-core.min.js)) and include it on your web page via a `<script>` tag. It will create a global `window.urllib` object (or define the module if you are using [RequireJS](http://requirejs.org/)):

```html
<script src="/lib/url-lib.min.js" type="text/javascript"></script>
```

_NOTE:_ [`formatQuery`](docs/formatQuery.md), [`formatUrl`](docs/formatUrl.md) and [`parseQuery`](docs/parseQuery.md) are included in the "core" dist.

## Usage

```js
var urllib = require('url-lib');

var url = urllib.formatUrl('http://www.benmvp.com/search?sort=recent&results=20&pg=1', {
    sort: 'popular',        // overwrites existing `sort` param in URL
    category: 'holiday',
    type: 'all',
    results: 100            // overwrites existing `results` param in URL
});
```

With the above code, `url` will be `'http://www.benmvp.com/search?sort=popular&results=100&pg=1&category=holiday&type=all'`

Check out the [docs](docs/) for more usage examples or [try out `url-lib` in your browser!](https://tonicdev.com/npm/url-lib)

## API Docs

- [`formatQuery`](docs/formatQuery.md) - Serializes the properties of a params object to produce a URL query string.
- [`formatUrl`](docs/formatUrl.md) - Serializes the specified URL path with properties of a params object to produce a URL.
- [`parseQuery`](docs/parseQuery.md) - Parses query parameters from a string, returning the query parameters as an object.
- [`getCacheDefeatStr`](docs/getCacheDefeatStr.md) - Returns a string value (generated using the time and a random number) that can be used as a query parameter value to cause a URL to be unique in order to defeat caching.
- [`parseUrl`](docs/parseUrl.md) - Parses the specified URL string into an object containing properties for the various logical segments.

## Polyfills needed to support older browsers

`url-lib` uses a number of ES5 features that are unsupported in older browsers (e.g. IE8-). The easiest way to add support to non-ES5 browsers is to use [`es5-shim`](https://github.com/es-shims/es5-shim).

Specifically the ES5 features in use are:

- [`Array.isArray`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray)
- [`Array.prototype.reduce`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)
- [`Object.keys`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)

## Contributing

Contributions are welcome! See [CONTRIBUTING](CONTRIBUTING.md) for more details.

## Project philosophy

We take the stability of this utility package **very** seriously. `url-lib` follows the [SemVer](http://semver.org/) standard for versioning.

All updates must pass the [CI build](https://travis-ci.org/benmvp/url-lib) while maintaining [100% code coverage](https://coveralls.io/github/benmvp/url-lib).

## License

[MIT](LICENSE). Copyright (c) 2016-2017 Ben Ilegbodu.
