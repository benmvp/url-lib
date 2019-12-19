## `parseUrl`

Parses the specified URL string into an object containing properties for the various logical segments.

`parseUrl` provides a convenient way to get at very precise portions of a URL string, such as the file name without the extension, the file type without the "." (period) character, the query params string without the "?" (question mark) character, the anchor without the "#" (pound / hash) character, etc. It returns a superset of properties available [`Location` Web API](https://developer.mozilla.org/en-US/docs/Web/API/Location).

## Syntax

`parseUrl(url: string): object`

## Example

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

## URL segment properties

Properties marked `*` are equivalent to the same-named property of the [`Location` Web API](https://developer.mozilla.org/en-US/docs/Web/API/Location)

- `href`\* - the entire URL string parsed by `parseUrl`
- `fullDomain` - the `protocol`, `//` (two forward slashes), and the `host`
- `protocol`\* - the [Internet protocol](http://en.wikipedia.org/wiki/Internet_Protocol) in use by the URL (e.g. `http`, `ftp`, `ssh`, etc.)
- `host`\* - the `hostname`, followed by a `:` (colon) character and the `port`
- `hostname`\* - the name of the host (i.e. domain name or IP address), excluding the `protocol` and `port`
- `port`\* - the [port](http://en.wikipedia.org/wiki/TCP_and_UDP_port) on which to communicate with a server
- `pathname`\* - the `folderPath` and `file`, and excluding the `fullDomain`, `search`, and `hash`
- `folderPath` - the complete path to a folder (which may include multiple nested folder levels), excluding the `fullDomain`, `file`, `search`, and `hash`
- `file` - the `fileName` and `extension`, excluding the `fullDomain`, `folderPath`, `search`, and `hash`
- `fileName` - the file name for a file, excluding its `extension`
- `extension` - the file extension for a file, excluding its `fileName`
- `fileType` - the file type for a file, excluding the conventional `.` (period character)
- `search`\* - the `?` (question mark) character and `query`
- `query` - the query parameters, excluding the conventional `?` (question mark character)
- `hash`\* - the `#` (hash / pound character) and `anchor`
- `anchor` - the anchor name, excluding the conventional `#` (hash / pound character)

### URL segments as a tree

The following diagram shows the properties of object returned by `parseUrl` as a tree structure, illustrating the relationship between properties:

```
href
|__ fullDomain
|       |__ protocol
|       |__ //
|       |__ host
|            |__ hostname
|            |__ :
|            |__ port
|
|__ pathname
|      |__ folderPath
|      |__ file
|            |__ fileName
|            |__ extension
|                    |__ .
|                    |__ fileType
|
|__ search
|      |__ ?
|      |__ query
|
|__ hash
      |__ #
      |__ anchor
```

### Reconstructing a URL string

A URL string can be reconstructed from the object returned by `parseUrl` in one of the following ways:

```js
import { parseUrl } from 'url-lib'

const parsedUrl = parseUrl(
  'http://benmvp.com:80/docs/url-lib.html?param=value#anchor',
)

const urlA =
  parsedUrl.fullDomain + parsedUrl.pathname + parsedUrl.search + parsedUrl.hash

const urlB =
  parsedUrl.fullDomain +
  parsedUrl.folderPath +
  parsedUrl.file +
  parsedUrl.search +
  parsedUrl.hash

const urlC =
  parsedUrl.fullDomain +
  parsedUrl.folderPath +
  parsedUrl.fileName +
  parsedUrl.extension +
  parsedUrl.search +
  parsedUrl.hash
```

If instead you choose to reconstruct a URL string using any of the more granular URL segment properties, such as `protocol`, `hostname`, `port`, `fileType`, `query`, etc., you will have to use logic to conditionally include the delimiters `//,` `:,` `.,` `?,` and `#.`

## Notes

- See also the related [`parseQuery`](parseQuery.md)
