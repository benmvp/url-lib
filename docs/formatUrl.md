# `formatUrl`

Serializes the specified URL path with properties of a params object to produce a URL.

## Syntax

`formatUrl` is versatile in its signature, with several variations that can come in handy under different circumstances.

`string = urllib.formatUrl(urlPath: string, queryParams: object)`

`string = urllib.formatUrl(urlPath: string, queryParamsList: object[])`

`string = urllib.formatUrl(urlPathAndQueryParamsList: array)`

`string = urllib.formatUrl(urlPathAndQueryParamsList: array, queryParams: object)`

`string = urllib.formatUrl(urlPathAndQueryParamsList: array, queryParamsList: object[])`

`formatUrl` assumes that the query string should be serialized using `&` to separate parameters, and `=` to separate parameter names from values in each name/value pair.

## Examples

```js
var urllib = require('url-lib');

var url = urllib.formatUrl('http://www.benmvp.com/search', {
    category: 'holiday',
    type: 'all',
    results: 20
});
```

With the above code, `url` will be `'http://www.benmvp.com/search?category=holiday&type=all&results=20'`.

### An existing query (`?`) character

The value of `urlPath` may already contain a query (`?`) character at the end. If this is the case, `formatUrl` will **not** add an additional query character. The following example will produced the same resultant string as the above example.

```js
var urllib = require('url-lib');

var url = urllib.formatUrl('http://www.benmvp.com/search?', {
    category: 'holiday',
    type: 'all',
    results: 20
});
```

### Handling existing query parameters

The value of `urlPath` may already contain query parameters. If this is the case, `formatUrl` will concatenate additional query parameters, automatically overwriting any existing parameters if necessary.

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

### Remove existing query parameters

The value of `urlPath` may contain query parameters you want to remove. Removing existing query parameters from a URL can be accomplished by passing `null` as the query parameter value. Any `null` query parameter values that don't already exist in the URL will simply be ignored.

```js
var urllib = require('url-lib');

var url = urllib.formatUrl('http://www.benmvp.com/search?sort=recent&results=20&pg=1', {
    sort: null,         // remove existing `sort` param in URL
    category: null,     // ignored since doesn't exist in URL
    type: 'all',
    results: null       // removes existing `results` param in URL
});
```

With the above code, `url` will be `'http://www.benmvp.com/search?pg=1&type=all'`

### URL with array of query parameter objects

When `queryParamsList` is specified with `urlPath`, multiple query param objects can be specified in an array. This provides a simple way to merge query param sets from multiple sources, to combine fixed parameters with dynamic ones, or to override the values in previous param sets. The values from params objects later in the array override those from earlier params objects. None of the objects in the array will be modified by the operation.

```js
var urllib = require('url-lib');

var defaultSearchSettings = {
        sort: 'recent',
        type: 'all',
        results: 20
    },
    url = urllib.formatUrl('http://www.benmvp.com/search',
        [
            defaultSearchSettings,
            {
                category: 'holiday',
                sort: 'popular'
            }
        ]
    );
```

With the above code, the values of `category` and `sort` in the second params object will be merged into `defaultSearchSettings`. The `sort` parameter will override the value in `defaultSearchSettings`, and `defaultSearchSettings` will not be modified in the process.

`url` will be `'http://www.benmvp.com/search?sort=popular&type=all&results=20&category=holiday'`

### URL combined with query parameters in an array

Another versatile variation of `formatUrl` allows for a single `urlPathAndQueryParamsList` where the array specified contains the URL path string as its first element, and an arbitrary number of params objects in subsequent elements. Using this variation, the previous example could be re-written as:

```js
var urllib = require('url-lib');

var defaultSearchSettings = {
        sort: 'recent',
        type: 'all',
        results: 20
    },
    url = urllib.formatUrl([
        'http://www.benmvp.com/search',
        defaultSearchSettings,
        {
            category: 'holiday',
            sort: 'popular'
        }
    ]);
```

This variation is powerful in that it allows us to write functions that can accept a single URL parameter, where that parameter's value may be a string, **or** an array containing a string path and params objects. A single call to `formatUrl` will format it to a string for the benefit of your functions' implementation code.

### Miscellaneous variations

When using the `urlPathAndQueryParamsList` parameter, you can still specify the `queryParams` second parameter to merge in further query params:

```js
var urllib = require('url-lib');

var defaultSearchSettings = {
        sort: 'recent',
        type: 'all',
        results: 20
    },
    url = urllib.formatUrl(
        ['http://www.benmvp.com/search', defaultSearchSettings],
        {
            category: 'holiday',
            sort: 'popular'
        }
    ]);
```

The above example would produce the same value for `url` as the previous examples.

Finally, it is also possible to specify the `urlPathAndQueryParamsList` with the `queryParamsList` second parameter, allowing ridiculous numbers of query params objects to be specified where desired and/or convenient. We can modify the previous code to produce the same result:

```js
var urllib = require('url-lib');

var defaultSearchSettings = {
        sort: 'recent',
        type: 'all',
        results: 20
    },
    url = urllib.formatUrl(
        ['http://www.benmvp.com/search', defaultSearchSettings],
        [
            {category: 'holiday'},
            {sort: 'popular'}
        ]
    ]);
```

### Conditional Params

If the value for a query params object is `null` or `undefined`, it will simply be treated as an empty params object, regardless of whether it's specified for the `queryParams` parameter or one of the elements in the `urlPathAndQueryParamsList` or `queryParamsList` parameters. This is convenient when using conditional expressions to choose params that should or should not be present:

```js
var urllib = require('url-lib');

var defaultSearchSettings = {
        category: 'any',
        sort: 'recent',
        type: 'all',
        results: 20
    },
    url = urllib.formatUrl([
        'http://www.benmvp.com/search',
        defaultSearchSettings,
        searchCategory ? {category: searchCategory} : null,
        useUserSearchSettings ? useUserSearchSettings : null,
        useCustomSort ? {sort: customSort} : null
    ]);
```

## Notes
- `formatUrl` coerces all param values to string (so objects with custom `.toString()` methods can be serialized)
- See also the companion [`parseUrl`](parseUrl.md)
- See also the related [`formatQuery`](formatQuery.md)
