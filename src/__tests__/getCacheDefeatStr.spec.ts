import getCacheDefeatStr from '../getCacheDefeatStr'

describe('getCacheDefeatStr', () => {
  it('returns a non-empty string', () => {
    const cacheDefeatStr = getCacheDefeatStr()

    expect(typeof cacheDefeatStr).toBe('string')
    expect(cacheDefeatStr).not.toBe('')
  })

  it('returns different values for successive calls', () => {
    const resultsSet = new Set()
    const iterations = 10

    for (let callNo = 0; callNo < iterations; callNo++) {
      resultsSet.add(getCacheDefeatStr())
    }

    expect([...resultsSet]).toHaveLength(iterations)
  })
})
