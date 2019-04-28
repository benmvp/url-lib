// Adapted from the Uize.Url module, a part of the UIZE JavaScript Framework.

let cacheDefeatStrCallCount = 0

/**
* Returns a string value (generated using the time and a random number)
* that can be used as a query parameter value to cause a URL to be
* unique in order to defeat caching.
* @returns {string} Cache defeat string
*/
const getCacheDefeatStr = (): string => {
  // Three pieces of randomness:

  // current timestamp
  const timestamp = Date.now()

  // random number between 1-1000
  const randomNum = Math.round(Math.random() * 1000)

  // continuously incrementing counter
  const counter = cacheDefeatStrCallCount++

  return `${timestamp}${randomNum}${counter}`
}

export default getCacheDefeatStr
