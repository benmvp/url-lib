import {
  formatQuery,
  formatUrl,
  getCacheDefeatStr,
  parseQuery,
  parseUrl,
  UrlParams,
} from 'url-lib'

describe('formatQuery', () => {
  it('formats query params object', () => {
    const queryString = formatQuery({
      category: 'holiday',
      type: 'all',
      results: '20',
    })

    expect(queryString).toEqual('category=holiday&type=all&results=20')
  })

  it('formats query params array of objects', () => {
    const defaultSearchSettings = {
      sort: 'recent',
      type: 'all',
      results: '20',
    }
    const queryString = formatQuery([
      defaultSearchSettings,
      {
        category: 'holiday',
        sort: 'popular',
      },
    ])

    expect(queryString).toEqual(
      'sort=popular&type=all&results=20&category=holiday',
    )
  })
})

describe('formatUrl', () => {
  it('adds query params object to URL', () => {
    const url = formatUrl('http://www.benmvp.com/search', {
      category: 'holiday',
      type: 'all',
      results: 20,
    })

    expect(url).toEqual(
      'http://www.benmvp.com/search?category=holiday&type=all&results=20',
    )
  })

  it('handles an existing ? in URL', () => {
    const url = formatUrl('http://www.benmvp.com/search?', {
      category: 'holiday',
      type: 'all',
      results: 20,
    })

    expect(url).toEqual(
      'http://www.benmvp.com/search?category=holiday&type=all&results=20',
    )
  })

  it('overwrites existing query params already in URL', () => {
    const url = formatUrl(
      'http://www.benmvp.com/search?sort=recent&results=20&pg=1',
      {
        sort: 'popular',
        category: 'holiday',
        type: 'all',
        results: 100,
      },
    )

    expect(url).toEqual(
      'http://www.benmvp.com/search?sort=popular&results=100&pg=1&category=holiday&type=all',
    )
  })

  it('removes existing query parameters by setting `null` value', () => {
    const url = formatUrl(
      'http://www.benmvp.com/search?sort=recent&results=20&pg=1',
      {
        sort: null,
        category: null,
        type: 'all',
        results: null,
      },
    )

    expect(url).toEqual('http://www.benmvp.com/search?pg=1&type=all')
  })

  it('formats URL from array of query params objects', () => {
    const defaultSearchSettings = {
      sort: 'recent',
      type: 'all',
      results: 20,
    }
    const url = formatUrl('http://www.benmvp.com/search', [
      defaultSearchSettings,
      {
        category: 'holiday',
        sort: 'popular',
      },
    ])

    expect(url).toEqual(
      'http://www.benmvp.com/search?sort=popular&type=all&results=20&category=holiday',
    )
  })

  it('formats URL from array with URL and list of query params objects', () => {
    const defaultSearchSettings = {
      sort: 'recent',
      type: 'all',
      results: 20,
    }
    const url = formatUrl([
      'http://www.benmvp.com/search',
      defaultSearchSettings,
      {
        category: 'holiday',
        sort: 'popular',
      },
    ])

    expect(url).toEqual(
      'http://www.benmvp.com/search?sort=popular&type=all&results=20&category=holiday',
    )
  })

  it('formats additional query params object after array with URL and list of query params objects', () => {
    const defaultSearchSettings = {
      sort: 'recent',
      type: 'all',
      results: 20,
    }
    const url = formatUrl(
      ['http://www.benmvp.com/search', defaultSearchSettings],
      {
        category: 'holiday',
        sort: 'popular',
      },
    )

    expect(url).toEqual(
      'http://www.benmvp.com/search?sort=popular&type=all&results=20&category=holiday',
    )
  })

  it('formats array with URL list + array of query params objects', () => {
    const defaultSearchSettings = {
      sort: 'recent',
      type: 'all',
      results: 20,
    }
    const url = formatUrl(
      ['http://www.benmvp.com/search', defaultSearchSettings],
      [{ category: 'holiday' }, { sort: 'popular' }],
    )

    expect(url).toEqual(
      'http://www.benmvp.com/search?sort=popular&type=all&results=20&category=holiday',
    )
  })

  it('properly types function wrappers', () => {
    const API_BASE = 'http://api.benmvp.com'
    const buildUrl = (
      apiName: string,
      command: string,
      params: UrlParams,
    ): string => {
      const apiUrl = formatUrl(`${API_BASE}/${apiName}`, [
        {
          cmd: command,
          key: 'MW9S-E7SL-26DU-VV8V',
        },
        params,
      ])

      return apiUrl
    }

    expect(buildUrl('events', 'get', { q: 'javascript', pg: 2 })).toEqual(
      'http://api.benmvp.com/events?cmd=get&key=MW9S-E7SL-26DU-VV8V&q=javascript&pg=2',
    )
  })
})

describe('getCacheDefeatStr', () => {
  it('returns different values for successive calls', () => {
    const resultsSet = new Set()
    const iterations = 10

    for (let callNo = 0; callNo < iterations; callNo++) {
      resultsSet.add(getCacheDefeatStr())
    }

    expect([...resultsSet]).toHaveLength(iterations)
  })
})

describe('parseQuery', () => {
  it('parses a query string', () => {
    const paramsObj = parseQuery('category=holiday&type=all&results=20')

    expect(paramsObj).toEqual({
      category: 'holiday',
      type: 'all',
      results: '20',
    })
  })

  it('parses a query from a URL with a query string', () => {
    const paramsObj = parseQuery(
      'http://www.somedomain.com/search?category=holiday&type=all&results=20',
    )

    expect(paramsObj).toEqual({
      category: 'holiday',
      type: 'all',
      results: '20',
    })
  })
})

describe('parseUrl', () => {
  it('parses all the pieces of a URL', () => {
    const parsedUrl = parseUrl(
      'http://benmvp.com:80/docs/url-lib.html?param=value#anchor',
    )

    expect(parsedUrl).toEqual({
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
    })
  })
})
