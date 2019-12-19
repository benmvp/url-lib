// Adapted from the Uize.Url module, a part of the UIZE JavaScript Framework.

import { encode } from './utils'
import { NullableUrlParams } from './types'

const IMMUTABLE_EMPTY_OBJECT: NullableUrlParams = {}

/**
 * Serializes the properties of a params object to produce a URL query string.
 * @param {NullableUrlParams | NullableUrlParams[]} [urlParams] - An object (or array of objects) representing the query
 * @returns {string} Serialized query string
 */
const formatQuery = (
  urlParams?: NullableUrlParams | NullableUrlParams[],
): string => {
  let paramsObj = urlParams

  if (Array.isArray(paramsObj)) {
    paramsObj =
      paramsObj.length < 2 ? paramsObj[0] : Object.assign({}, ...paramsObj)
  }

  const normalizedParams =
    (paramsObj as NullableUrlParams) || IMMUTABLE_EMPTY_OBJECT

  return Object.keys(normalizedParams)
    .reduce((prevUrlParamPairs, paramName) => {
      const urlParamPairs = prevUrlParamPairs
      let paramValue

      if (paramName) {
        paramValue = normalizedParams[paramName]

        if (paramValue != null) {
          urlParamPairs.push(`${encode(paramName)}=${encode(paramValue)}`)
        }
      }

      return urlParamPairs
    }, [] as string[])
    .join('&')
}

export default formatQuery
