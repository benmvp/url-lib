import parseQuery from '../parseQuery'

describe('parseQuery', () => {
  it('returns an empty object when no parameters are passed', () => {
    const paramsObj = parseQuery()

    expect(paramsObj).toEqual({})
  })

  it('returns an empty object when passed an empty query string', () => {
    const paramsObj = parseQuery('')

    expect(paramsObj).toEqual({})
  })

  it('returns an empty object when query string is just "?"', () => {
    const paramsObj = parseQuery('?')

    expect(paramsObj).toEqual({})
  })

  it('returns an empty object when URL just has "?"', () => {
    const paramsObj = parseQuery('http://www.benmvp.com?')

    expect(paramsObj).toEqual({})
  })

  it('assumes a string with no "?" is a query string', () => {
    const paramsObj = parseQuery('paramName=paramValue')

    expect(paramsObj).toEqual({paramName: 'paramValue'})
  })

  it('parses a query string with multiple params correctly', () => {
    const paramsObj = parseQuery('param1Name=param1Value&param2Name=param2Value&param3Name=param3Value')

    expect(paramsObj).toEqual({param1Name: 'param1Value', param2Name: 'param2Value', param3Name: 'param3Value'})
  })

  it('parses a full URL correctly', () => {
    const paramsObj = parseQuery('http://www.benmvp.com?param1Name=param1Value&param2Name=param2Value&param3Name=param3Value')

    expect(paramsObj).toEqual({param1Name: 'param1Value', param2Name: 'param2Value', param3Name: 'param3Value'})
  })

  it('defaults params with no value specified to empty strings', () => {
    const paramsObj = parseQuery('param1=&param2=')

    expect(paramsObj).toEqual({param1: '', param2: ''})
  })

  it('defaults params with no equal sign to empty strings', () => {
    const paramsObj = parseQuery('param1&param2')

    expect(paramsObj).toEqual({param1: '', param2: ''})
  })

  it('defaults params with some using equal signs and others not all to empty strings', () => {
    const paramsObj = parseQuery('param1&param2=&param3')

    expect(paramsObj).toEqual({param1: '', param2: '', param3: ''})
  })

  it('does not coerce values from strings', () => {
    const paramsObj = parseQuery('param1=true&param2=42&param3=NaN&param4=Infinity&param5={}&param6=[]&param7=null&param8=undefined')

    expect(paramsObj).toEqual({
      param1: 'true',
      param2: '42',
      param3: 'NaN',
      param4: 'Infinity',
      param5: '{}',
      param6: '[]',
      param7: 'null',
      param8: 'undefined',
    })
  })

  it('decodes param values that are URI-encoded', () => {
    const paramsObj = parseQuery('param1=%60%40%23%24%25%5E%26%2B%3D%5B%5D%7B%7D%7C%5C%3A%3B%22%3C%3E%2C%3F%2F%20&param2=hello')

    expect(paramsObj).toEqual({
      param1: '`@#$%^&+=[]{}|\\:;"<>,?/ ',
      param2: 'hello',
    })
  })

  it('decodes param names that are URI-encoded', () => {
    const paramsObj = parseQuery('%60%40%23%24%25%5E%26%2B%3D%5B%5D%7B%7D%7C%5C%3A%3B%22%3C%3E%2C%3F%2F%20=hello')

    expect(paramsObj).toEqual({'`@#$%^&+=[]{}|\\:;"<>,?/ ': 'hello'})
  })

  it('ignores params without a name and does not include in resultant object', () => {
    const paramsObj = parseQuery('http://www.benmvp.com?=blah&param=foo')

    expect(paramsObj).toEqual({param: 'foo'})
  })

  it('supports using a space as a param name', () => {
    const paramsObj = parseQuery('%20=space%2C%20the%20final%20frontier')

    expect(paramsObj).toEqual({' ': 'space, the final frontier'})
  })

  it('respects case-sensitivity of param names and values', () => {
    const paramsObj = parseQuery('param=value&PARAM=VALUE')

    expect(paramsObj).toEqual({param: 'value', PARAM: 'VALUE'})
  })

  it('uses the last value when the same-named param occurs multiple times', () => {
    const paramsObj = parseQuery('foo=bar&foo=pub&foo=spacebar')

    expect(paramsObj).toEqual({foo: 'spacebar'})
  })
})
