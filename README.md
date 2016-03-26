# url-lib

A string utility for Node and browsers that supports serializing and parsing URLs and query strings.

The primary use case is for building string URLs with query parameters for the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) that is polyfilled in the browser via [`fetch`](https://github.com/github/fetch) and in Node via [`node-fetch`](https://github.com/bitinn/node-fetch) libraries. [`isomorphic-fetch`](https://github.com/matthew-andrews/isomorphic-fetch) combines the two.

`url-lib` is derived from the [`Uize.Url`](https://github.com/UIZE/UIZE-JavaScript-Framework/blob/master/site-source/js/Uize/Url.js) module that is a part of the open-source [UIZE JavaScript Framework](https://github.com/UIZE/UIZE-JavaScript-Framework).

## Installation

Install via [NPM](https://docs.npmjs.com/getting-started/installing-npm-packages-locally) (coming soon!):

```sh
npm install --save url-lib
```

Use with [Node](https://nodejs.org/en/), [webpack](https://webpack.github.io/) or [browserify](http://browserify.org/):

```js
import * as urllib from 'url-lib'; // ES6+
var urllib = require('url-lib'); // ES5-
```

As a last resort, you can simply include `url-lib.js` on your web page via a `<script>` tag and it will create a global `urllib` object, or define the module if you are using [RequireJS](http://requirejs.org/).

## Usage

Coming soon...

## API Docs

- [`formatQuery`](docs/formatQuery.md) - Serializes the properties of a params object to produce a URL query string.
- `formatUrl` - _Coming soon..._
- [`getCacheDefeatStr`](docs/getCacheDefeatStr.md) - Returns a string value (generated using the time and a random number) that can be used as a query parameter value to cause a URL to be unique in order to defeat caching.
- [`parseQuery`](docs/parseQuery.md) - Parses query parameters from a string, returning the query parameters as an object.
- `parseUrl` - _Coming soon..._

## Polyfills needed to support older browsers

- `Array.isArray`: see [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray) for details about unsupported older browsers (e.g. IE8-) and a simple polyfill (or use [`es5-shim`](https://github.com/es-shims/es5-shim))

## License

[MIT](LICENSE). Copyright (c) 2016 Ben Ilegbodu.
