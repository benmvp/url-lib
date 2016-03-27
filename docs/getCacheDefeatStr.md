# `getCacheDefeatStr`

Returns a string value (generated using the time and a random number) that can be used as a query parameter value to cause a URL to be unique in order to defeat caching.

## Syntax

`string = getCacheDefeatStr()`

## Example

```js
var urllib = require('url-lib'),
    getCacheDefeatStr = require('url-lib/getCacheDefeatStr');

var url = urllib.formatUrl(
    'http://www.foo.com',
    {
        q: 'benmvp',
        r: getCacheDefeatStr()
    }
)
```

## Notes

- `getCacheDefeatStr` is provided in a separate add-on module (`url-lib/getCacheDefeatStr'`)
