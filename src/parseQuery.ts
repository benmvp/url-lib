import { splitOnQuery, decode } from './utils'
import { UrlParams } from './types'

/**
 * Parses query parameters from a string, returning the query parameters as an object.
 * @param {string} [strToParse=''] - The string from which to parse query parameters
 * @param {boolean} [favorQuery=true] - Whether or not to treat the full string to parse as query parameters when it doesn't have "?" in it
 * @returns {UrlParams} Parsed query parameters
 */
const parseQuery = (strToParse = '', favorQuery = true): UrlParams => {
  // Ensure that all we parse is a query string
  const { queryString = '' } = splitOnQuery(strToParse, favorQuery !== false)

  return queryString
    .split('&')
    .reduce((prevUrlParams, serializedUrlParamPair) => {
      const urlParams = prevUrlParams
      const [
        urlParamNameEncoded,
        urlParamValueEncoded,
      ] = serializedUrlParamPair.split('=')

      if (urlParamNameEncoded) {
        urlParams[decode(urlParamNameEncoded)] = decode(urlParamValueEncoded)
      }

      return urlParams
    }, {} as UrlParams)
}

export default parseQuery
