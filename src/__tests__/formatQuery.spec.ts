import formatQuery from '../formatQuery'

describe('formatQuery', () => {
  it('returns an empty string when no parameters are passed', () => {
    const queryString = formatQuery()

    expect(queryString).toEqual('')
  })

  it('returns an empty string when `null` is passed passed', () => {
    const queryString = formatQuery(null)

    expect(queryString).toEqual('')
  })

  it('returns an empty string when `undefined` is passed passed', () => {
    // eslint-disable-next-line no-undefined
    const queryString = formatQuery(undefined)

    expect(queryString).toEqual('')
  })

  it('returns an empty string when empty query params is passed passed', () => {
    const queryString = formatQuery({})

    expect(queryString).toEqual('')
  })

  it('formats a query params object with a single param correctly', () => {
    const queryString = formatQuery({ paramName: 'paramValue' })

    expect(queryString).toEqual('paramName=paramValue')
  })

  it('ignores property keys that are empty', () => {
    const queryString = formatQuery({ '': 'peekaboo', foo: 'bar' })

    expect(queryString).toEqual('foo=bar')
  })

  it('ignores null or undefined property values', () => {
    // eslint-disable-next-line no-undefined
    const queryString = formatQuery({
      param1: undefined,
      param2: null,
      param3: 'hello',
    })

    expect(queryString).toEqual('param3=hello')
  })

  it('does not ignore property values that are empty strings', () => {
    const queryString = formatQuery({ param1: '', param2: '' })

    expect(queryString).toEqual('param1=&param2=')
  })

  it('formats multiple query params correctly', () => {
    const queryString = formatQuery({
      param1Name: 'param1Value',
      param2Name: 'param2Value',
      param3Name: 'param3Value',
    })

    expect(queryString).toEqual(
      'param1Name=param1Value&param2Name=param2Value&param3Name=param3Value',
    )
  })

  it('property values are URI encoded', () => {
    const queryString = formatQuery({
      param1: '`@#$%^&+=[]{}|\\:;"<>,?/ ',
      param2: 'hello',
    })

    expect(queryString).toEqual(
      'param1=%60%40%23%24%25%5E%26%2B%3D%5B%5D%7B%7D%7C%5C%3A%3B%22%3C%3E%2C%3F%2F%20&param2=hello',
    )
  })

  it('property keys are URI encoded', () => {
    const queryString = formatQuery({ '`@#$%^&+=[]{}|\\:;"<>,?/ ': 'hello' })

    expect(queryString).toEqual(
      '%60%40%23%24%25%5E%26%2B%3D%5B%5D%7B%7D%7C%5C%3A%3B%22%3C%3E%2C%3F%2F%20=hello',
    )
  })

  it('supports a space as a property key', () => {
    const queryString = formatQuery({ ' ': 'space, the final frontier' })

    expect(queryString).toEqual('%20=space%2C%20the%20final%20frontier')
  })

  it('respects case-sensitivity of property keys and values', () => {
    const queryString = formatQuery({ param: 'value', PARAM: 'VALUE' })

    expect(queryString).toEqual('param=value&PARAM=VALUE')
  })

  it('coerces non string property values to strings', () => {
    const queryString = formatQuery({
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

    expect(queryString).toEqual(
      'p1=true&p2=false&p3=42&p4=42&p5=NaN&p6=Infinity&p7=hello&p8=hello&p9=hello&p10=1%2C2%2C3%2C4',
    )
  })

  it('returns an empty string for an empty array', () => {
    const queryString = formatQuery([])

    expect(queryString).toEqual('')
  })

  it('supports an array containing a single params object element', () => {
    const queryString = formatQuery([
      {
        param1Name: 'param1Value',
        param2Name: 'param2Value',
        param3Name: 'param3Value',
      },
    ])

    expect(queryString).toEqual(
      'param1Name=param1Value&param2Name=param2Value&param3Name=param3Value',
    )
  })

  it('supports an array containing a multiple params object elements', () => {
    const queryString = formatQuery([
      { param1Name: 'param1Value' },
      { param2Name: 'param2Value' },
      { param3Name: 'param3Value' },
    ])

    expect(queryString).toEqual(
      'param1Name=param1Value&param2Name=param2Value&param3Name=param3Value',
    )
  })

  it('uses the last param object when multiple have the same property key', () => {
    const queryString = formatQuery([
      { p1: 'obj1', p2: 'obj1', p3: 'obj1' },
      { p2: 'obj2', p3: 'obj2' },
      { p3: 'obj3' },
    ])

    expect(queryString).toEqual('p1=obj1&p2=obj2&p3=obj3')
  })
})
