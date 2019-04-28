// Adapted from the Uize.Url module, a part of the UIZE JavaScript Framework.
type UrlParamValue = string | number | boolean | object | null | undefined

interface UrlParams {
  [key: string]: UrlParamValue
}

const IMMUTABLE_EMPTY_OBJECT = {}

// const _decode = (str: string): string => str != null ? decodeURIComponent(str) : ''
const _encode = (str: UrlParamValue): string => encodeURIComponent(`${str}`)

/**
 * Serializes the properties of a params object to produce a URL query string.
 * @param {UrlParams | UrlParams[]} [urlParams] - An object (or array of objects) representing the query
 * @returns {string} Serialized query string
 */
const formatQuery = (urlParams: UrlParams | UrlParams[] | null | undefined): string => {
  let paramsObj = urlParams

  if (Array.isArray(paramsObj)) {
    paramsObj = paramsObj.length < 2
      ? paramsObj[0]
      : Object.assign({}, ...paramsObj)
  }

  const normalizedParams = paramsObj as UrlParams || IMMUTABLE_EMPTY_OBJECT as UrlParams

  return Object.keys(normalizedParams)
    .reduce((prevUrlParamPairs, paramName) => {
      const urlParamPairs = prevUrlParamPairs
      let paramValue

      if (paramName) {
        paramValue = normalizedParams[paramName]

        if (paramValue != null) {
          urlParamPairs.push(`${_encode(paramName)}=${_encode(paramValue)}`)
        }
      }

      return urlParamPairs
    }, [] as string[])
    .join('&')
}

export default formatQuery
