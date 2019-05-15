# `getCacheDefeatStr`

Returns a random string value that can be used as a query parameter value to cause a URL to be unique in order to defeat caching.

## Syntax

`getCacheDefeatStr(): string`

## Example

```js
import {formatUrl, getCacheDefeatStr} from 'url-lib';

const url = formatUrl(
    'http://www.github.com/search',
    {
        q: 'benmvp',
        r: getCacheDefeatStr()
    }
)
```

## Notes

_None_
