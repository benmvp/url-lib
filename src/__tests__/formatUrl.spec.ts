import formatUrl from '../formatUrl'

describe('formatUrl', () => {
  it('returns an empty string when nothing is passed', () => {
    const url = formatUrl()

    expect(url).toEqual('')
  })

  it('returns an empty string when an empty URL is passed', () => {
    const url = formatUrl('')

    expect(url).toEqual('')
  })

  it('returns the URL when a URL with no query string is passed', () => {
    const url = formatUrl('http://www.benmvp.com')

    expect(url).toEqual('http://www.benmvp.com')
  })

  it('returns the URL without "?" when a URL with "?" included (but no query string)', () => {
    const url = formatUrl('http://www.benmvp.com?')

    expect(url).toEqual('http://www.benmvp.com')
  })

  it('returns the same URL with query string when called with a URL with query string', () => {
    const url = formatUrl(
      'http://www.benmvp.com?param1Name=param1Value&param2Name=param2Value',
    )

    expect(url).toEqual(
      'http://www.benmvp.com?param1Name=param1Value&param2Name=param2Value',
    )
  })

  it('handles passing an empty URL, but with a query params object', () => {
    const url = formatUrl('', {
      param1Name: 'param1Value',
      param2Name: 'param2Value',
      param3Name: 'param3Value',
    })

    expect(url).toEqual(
      '?param1Name=param1Value&param2Name=param2Value&param3Name=param3Value',
    )
  })

  it('handles passing an non-empty URL (without query string) with a query params object', () => {
    const url = formatUrl('http://www.benmvp.com/search', {
      category: 'holiday',
      type: 'all',
      results: 20,
    })

    expect(url).toEqual(
      'http://www.benmvp.com/search?category=holiday&type=all&results=20',
    )
  })

  it('handles passing an non-empty URL (with `?`) and a query params object', () => {
    const url = formatUrl('http://www.benmvp.com/search?', {
      category: 'holiday',
      type: 'all',
      results: 20,
    })

    expect(url).toEqual(
      'http://www.benmvp.com/search?category=holiday&type=all&results=20',
    )
  })

  it('handles various different types of values in params object', () => {
    const url = formatUrl('http://www.benmvp.com', {
      p1: true,
      // eslint-disable-next-line no-new-wrappers
      p2: new Boolean(false),
      p3: 42,
      // eslint-disable-next-line no-new-wrappers
      p4: new Number(42),
      p5: NaN,
      p6: Infinity,
      p7: 'hello',
      // eslint-disable-next-line no-new-wrappers
      p8: new String('hello'),
      p9: {
        toString() {
          return 'hello'
        },
      },
      p10: [1, 2, 3, 4],
    })

    expect(url).toEqual(
      'http://www.benmvp.com?p1=true&p2=false&p3=42&p4=42&p5=NaN&p6=Infinity&p7=hello&p8=hello&p9=hello&p10=1%2C2%2C3%2C4',
    )
  })

  it('handles param name & values that need to be URI encoded', () => {
    const url = formatUrl('http://www.benmvp.com', {
      param1: '`@#$%^&+=[]{}|\\:;"<>,?/ ',
      '`@#$%^&+=[]{}|\\:;"<>,?/ ': 'hello',
    })

    expect(url).toEqual(
      'http://www.benmvp.com?param1=%60%40%23%24%25%5E%26%2B%3D%5B%5D%7B%7D%7C%5C%3A%3B%22%3C%3E%2C%3F%2F%20&%60%40%23%24%25%5E%26%2B%3D%5B%5D%7B%7D%7C%5C%3A%3B%22%3C%3E%2C%3F%2F%20=hello',
    )
  })

  it('adds properties query params object that already on URL query string', () => {
    const url = formatUrl('http://www.benmvp.com/search?pg=1', {
      sort: 'popular',
      category: 'holiday',
      type: 'all',
      results: 100,
    })

    expect(url).toEqual(
      'http://www.benmvp.com/search?pg=1&sort=popular&category=holiday&type=all&results=100',
    )
  })

  it('overwrites properties in query params object that are already on URL query string', () => {
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

  it('does not doubly encode param values that are already encoded (and not replaced)', () => {
    const url = formatUrl(
      'http://www.benmvp.com/search?sort=recent&pg=1&r=http%3A%2F%2Fwww.google.com%2F%3Fq%3Djavascript%2Burl%2Blib&results=20',
      {
        sort: 'popular',
      },
    )

    expect(url).toEqual(
      'http://www.benmvp.com/search?sort=popular&pg=1&r=http%3A%2F%2Fwww.google.com%2F%3Fq%3Djavascript%2Burl%2Blib&results=20',
    )
  })

  it('replaces already-encoded param name using unencoded name', () => {
    const url = formatUrl(
      'http://www.benmvp.com/search?sort=recent&complex%2Bname=complex%25value&pg=1',
      {
        'complex+name': 'complex//value',
      },
    )

    expect(url).toEqual(
      'http://www.benmvp.com/search?sort=recent&complex%2Bname=complex%2F%2Fvalue&pg=1',
    )
  })

  it('removes `null` query param values from URL', () => {
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

  it('handles URL with an array of query params objects', () => {
    const url = formatUrl('http://www.benmvp.com', [
      { param1Name: 'param1Value' },
      { param2Name: 'param2Value' },
      { param3Name: 'param3Value' },
    ])

    expect(url).toEqual(
      'http://www.benmvp.com?param1Name=param1Value&param2Name=param2Value&param3Name=param3Value',
    )
  })

  it('overrides in later query params objects with duplicate names', () => {
    const url = formatUrl('http://www.benmvp.com', [
      { p1: 'obj1', p2: 'obj1', p3: 'obj1' },
      { p2: 'obj2', p3: 'obj2' },
      { p3: 'obj3' },
    ])

    expect(url).toEqual('http://www.benmvp.com?p1=obj1&p2=obj2&p3=obj3')
  })

  it('handles an array of just a URL', () => {
    const url = formatUrl(['http://www.benmvp.com'])

    expect(url).toEqual('http://www.benmvp.com')
  })

  it('handles an array of a URL and multiple query params objects', () => {
    const url = formatUrl([
      'http://www.benmvp.com',
      { param1Name: 'param1Value' },
      { param2Name: 'param2Value' },
      { param3Name: 'param3Value' },
    ])

    expect(url).toEqual(
      'http://www.benmvp.com?param1Name=param1Value&param2Name=param2Value&param3Name=param3Value',
    )
  })

  it('handles an array of a URL and multiple query params object plus an additional query params object', () => {
    const url = formatUrl(
      [
        'http://www.benmvp.com',
        { param1Name: 'param1Value' },
        { param2Name: 'param2Value' },
      ],
      { param3Name: 'param3Value' },
    )

    expect(url).toEqual(
      'http://www.benmvp.com?param1Name=param1Value&param2Name=param2Value&param3Name=param3Value',
    )
  })

  it('handles an array of a URL and multiple query params object plus an additional array of query params objects', () => {
    const url = formatUrl(
      ['http://www.benmvp.com', { param1Name: 'param1Value' }],
      [{ param2Name: 'param2Value' }, { param3Name: 'param3Value' }],
    )

    expect(url).toEqual(
      'http://www.benmvp.com?param1Name=param1Value&param2Name=param2Value&param3Name=param3Value',
    )
  })

  it('handles an array of a URL and multiple query params objects (with null values)', () => {
    const url = formatUrl([
      'http://www.benmvp.com',
      { param1Name: 'param1Value' },
      null,
      { param3Name: 'param3Value' },
    ])

    expect(url).toEqual(
      'http://www.benmvp.com?param1Name=param1Value&param3Name=param3Value',
    )
  })

  it('handles an array of a URL and multiple query params object plus an additional array of query params objects (with null values)', () => {
    const url = formatUrl(
      ['http://www.benmvp.com', null],
      [{ param2Name: 'param2Value' }, null],
    )

    expect(url).toEqual('http://www.benmvp.com?param2Name=param2Value')
  })
})
