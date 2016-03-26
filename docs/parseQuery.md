# `parseQuery`

Parses query parameters from a string, returning the query parameters as an object.

## Syntax

`object = urllib.parseQuery(strToParse: string)`

`parseQuery` assumes that the query string within `strToParse` was serialized using `&` to separate parameters, and `=` to separate parameter names from values in each name/value pair.

## Example

```js
var urllib = require('url-lib');

var url = urllib.parseQuery('category=holiday&type=all&results=20');
```

With the above code, `url` will be the following object:

```js
{
    category: 'holiday',
    type: 'all',
    results: '20'
}
```

The value of the `strToParse` parameter may contain a prepended `?` character, and even a URL path. These will simply be ignored when parsing the query parameters, so this function can be applied to a complete URL without worrying about first having to remove the path.

Therefore, the following code will have the same result as the above example:

```js
var urllib = require('url-lib');

var url = urllib.parseQuery('http://www.somedomain.com/search?category=holiday&type=all&results=20');
```

## Notes

- When parsing the query string, all parameter values are treated as strings
- See also the companion [`formatQuery`](formatQuery.md)
