# API Docs

## [`formatQuery`](docs/formatQuery.md)

Serializes the properties of a params object to produce a URL query string.

```js
var urllib = require('url-lib');

var queryString = urllib.formatQuery({
    category: 'holiday',
    type: 'all',
    results: '20'
});
```

With the above code, `queryString` will be `'category=holiday&type=all&results=20'`.

Read full documentation for [`formatQuery`](docs/formatQuery.md).

-----

## [`formatUrl`](docs/formatUrl.md)

Serializes the specified URL path with properties of a params object to produce a URL.

```js
var urllib = require('url-lib');

var url = urllib.formatUrl('http://www.benmvp.com/search', {
    category: 'holiday',
    type: 'all',
    results: 20
});
```

With the above code, `url` will be `'http://www.benmvp.com/search?category=holiday&type=all&results=20'`.

Read full documentation for [`formatUrl`](docs/formatUrl.md).

-----

## [`getCacheDefeatStr`](docs/getCacheDefeatStr.md)

Returns a string value (generated using the time and a random number) that can be used as a query parameter value to cause a URL to be unique in order to defeat caching.

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

Read full documentation for [`getCacheDefeatStr`](docs/getCacheDefeatStr.md).

-----

## [`parseQuery`](docs/parseQuery.md)

Parses query parameters from a string, returning the query parameters as an object.

```js
var urllib = require('url-lib');

var paramsObj = urllib.parseQuery('category=holiday&type=all&results=20');
```

With the above code, `paramsObj` will be the following object:

```js
{
    category: 'holiday',
    type: 'all',
    results: '20'
}
```

Read full documentation for [`parseQuery`](docs/parseQuery.md).

-----

## `parseUrl`

_Coming soon..._
