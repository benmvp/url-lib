# `getCacheDefeatStr`

Returns a string value (generated using the time and a random number) that can be used as a query parameter value to cause a URL to be unique in order to defeat caching.

## Syntax

`string = urllib.getCacheDefeatStr()`

## Example

```js
var urllib = require('url-lib');

var url = urllib.formatUrl(
    'http://www.foo.com',
    {
        q: 'benmvp',
        r: urllib.getCacheDefeatStr()
    }
)
```
