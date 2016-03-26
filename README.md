# url-lib

A string utility for Node and browsers that supports serializing and parsing URLs and query strings.

The primary use case is for building string URLs with query parameters for the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) that is polyfilled in the browser via [`fetch`](https://github.com/github/fetch) and in Node via [`node-fetch`](https://github.com/bitinn/node-fetch). [`isomorphic-fetch`](https://github.com/matthew-andrews/isomorphic-fetch) combines the two.

url-lib is derived from the [`Uize.Url`](https://github.com/UIZE/UIZE-JavaScript-Framework/blob/master/site-source/js/Uize/Url.js) module that is a part of the [UIZE JavaScript Framework](https://github.com/UIZE/UIZE-JavaScript-Framework).

## Installation

Install via [NPM](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```sh
npm install url-lib
```

Use with [Node](https://nodejs.org/en/), [webpack](https://webpack.github.io/) or [browserify](http://browserify.org/):

```js
var urllib = require('url-lib');

urllib.formatUrl('https://www.google.com', {q: 'benmvp'}); // => 'https://www.google.com?q=benmvp'
```

As a last resort, you can simply include `url-lib.js` on your web page via a `<script>` tag and it will create a global `urllib` object, or define the module if you are using [RequireJS](http://requirejs.org/).

## Usage

Coming soon...

## Polyfills needed to support older browsers

None

## License

[MIT](LICENSE). Copyright (c) 2016 Ben Ilegbodu.
