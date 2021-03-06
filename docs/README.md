# API Docs

## [`formatQuery`](formatQuery.md)

Serializes the properties of a params object to produce a URL query string.

```js
import { formatQuery } from 'url-lib'

const queryString = formatQuery({
  category: 'holiday',
  type: 'all',
  results: '20',
})
```

With the above code, `queryString` will be `'category=holiday&type=all&results=20'`.

Read full documentation for [`formatQuery`](formatQuery.md).

---

## [`formatUrl`](formatUrl.md)

Serializes the specified URL path with properties of a params object to produce a URL.

```js
import { formatUrl } from 'url-lib'

const url = formatUrl('http://www.benmvp.com/search', {
  category: 'holiday',
  type: 'all',
  results: 20,
})
```

With the above code, `url` will be `'http://www.benmvp.com/search?category=holiday&type=all&results=20'`.

Read full documentation for [`formatUrl`](formatUrl.md).

---

## [`getCacheDefeatStr`](getCacheDefeatStr.md)

Returns a string value (generated using the time and a random number) that can be used as a query parameter value to cause a URL to be unique in order to defeat caching.

```js
import { formatUrl, getCacheDefeatStr } from 'url-lib'

const url = formatUrl('http://www.github.com/search', {
  q: 'benmvp',
  r: getCacheDefeatStr(),
})
```

Read full documentation for [`getCacheDefeatStr`](getCacheDefeatStr.md).

---

## [`parseQuery`](parseQuery.md)

Parses query parameters from a string, returning the query parameters as an object.

```js
import { parseQuery } from 'url-lib'

const paramsObj = parseQuery('category=holiday&type=all&results=20')
```

With the above code, `paramsObj` will be the following object:

```js
{
    category: 'holiday',
    type: 'all',
    results: '20',
}
```

Read full documentation for [`parseQuery`](parseQuery.md).

---

## [`parseUrl`](parseUrl.md)

Parses the specified URL string into an object containing properties for the various logical segments.

```js
import { parseUrl } from 'url-lib'

const parsedUrl = parseUrl(
  'http://benmvp.com:80/docs/url-lib.html?param=value#anchor',
)
```

With the above code, `parsedUrl` would be the following object:

```js
{
    href: 'http://benmvp.com:80/docs/url-lib.html?param=value#anchor',
    fullDomain: 'http://benmvp.com:80',
    protocol: 'http:',
    host: 'benmvp.com:80',
    hostname: 'benmvp.com',
    port: '80',
    pathname: '/docs/url-lib.html',
    folderPath: '/docs/',
    file: 'url-lib.html',
    fileName: 'url-lib',
    extension: '.html',
    fileType: 'html',
    search: '?param=value',
    query: 'param=value',
    hash: '#anchor',
    anchor: 'anchor',
}
```

Read full documentation for [`parseUrl`](parseUrl.md).
