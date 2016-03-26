# `formatQuery`

Serializes the properties of a params object to produce a URL query string.

## Syntax

`string = urllib.formatQuery(urlParams: object)`

`string = urllib.formatQuery(urlParamsList: object[])`

`formatQuery` assumes that `urlParams` should be serialized using `&` to separate parameters, and `=` to separate parameter names from values in each name/value pair.

## Examples

```js
var urllib = require('url-lib');

var queryString = urllib.formatQuery({
    category: 'holiday',
    type: 'all',
    results: '20'
});
```

With the above code, `queryString` will be `'category=holiday&type=all&results=20'`.

A variation of the syntax allows for the parameter passed to `formatQuery` to be an array (e.g. `urlParamsList`). This provides for an easy way to merge query param sets from multiple sources, or to blend fixed params with parameterized params (e.g. passed in a method call), or to override the values in param sets. The values from params objects later in the array override those from earlier params objects. None of the objects in the array will be modified by the operation.

```js
var urllib = require('url-lib');

var defaultSearchSettings = {
        sort:'recent',
        type:'all',
        results:'20'
    },
    queryString = urllib.formatQuery(defaultSearchSettings, {
        category: 'holiday',
        sort: 'popular'
    });
```

In the above example, the values for the `category` & `sort` properties in the second params object in `urlParamsList` would be merged into the values provided by the `defaultSearchSettings` query params object that appears first in the array, with the value of the `sort` property of the second params object overriding the value contained in the `defaultSearchSettings` object. The `defaultSearchSettings` object will **not** be modified in the process.

With the above code, `queryString` will be `'sort=popular&type=all&results=20&category=holiday'`.

## Notes

- `formatQuery` does not prepend the query `?` character to the resultant query string
- See also the companion [`parseQuery`](parseQuery.md)
