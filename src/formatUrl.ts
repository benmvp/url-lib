// Adapted from the Uize.Url module, a part of the UIZE JavaScript Framework.

import parseQuery from './parseQuery'
import formatQuery from './formatQuery'
import {splitOnQuery} from './utils'
import {UrlParams} from './types'

type UrlPathAndParams = [string, ...UrlParams[]]

const IMMUTABLE_EMPTY_ARRAY = []

/**
* Serializes the specified URL path with properties of a params object to produce a URL.
* @param {string} urlPath - Base URL path
* @param {UrlParams} urlParams - Query params to combine with base URL
* @returns {string} Serialized URL
*/
function formatUrl(urlPath: string, urlParams: UrlParams): string

/**
* Serializes the specified URL path with properties of a params object to produce a URL.
* @param {string} urlPath - Base URL path
* @param {UrlParams[]} urlParamsList - Multiple query params to merge and then combine with base URL
* @returns {string} Serialized URL
*/
function formatUrl(urlPath: string, urlParamsList: UrlParams[]): string

/**
* Serializes the specified URL path with properties of a params object to produce a URL.
* @param {UrlPathAndParams} urlPathAndParamsTuple - Tuple of base URL path + one or more query params to combine with base URL
* @returns {string} Serialized URL
*/
function formatUrl(urlPathAndParamsTuple: UrlPathAndParams): string

/**
* Serializes the specified URL path with properties of a params object to produce a URL.
* @param {UrlPathAndParams} urlPathAndParamsTuple - Tuple of base URL path + one or more query params to combine with base URL
* @param {UrlParams} urlParams - More query params to combine with `urlPathAndParamsTuple`
* @returns {string} Serialized URL
*/
function formatUrl(urlPathAndParamsTuple: UrlPathAndParams, urlParams: UrlParams): string

/**
* Serializes the specified URL path with properties of a params object to produce a URL.
* @param {UrlPathAndParams} urlPathAndParamsTuple - Tuple of base URL path + one or more query params to combine with base URL
* @param {UrlParams[]} urlParamsList - Multiple query params to merge and then combine with `urlPathAndParamsTuple`
* @returns {string} Serialized URL
*/
function formatUrl(urlPathAndParamsTuple: UrlPathAndParams, urlParamsList: UrlParams[]): string


// eslint-disable-next-line func-style
function formatUrl (urlPath, urlParams): any {
  let formattedUrl = urlPath
  let queryParams = urlParams

  // if they passed an array as the first parameter, separate out the first
  // element (url) from the other elements (query params list)
  if (Array.isArray(formattedUrl)) {
    const [url, ...urlParamsList] = formattedUrl

    queryParams = urlParamsList.concat(queryParams || IMMUTABLE_EMPTY_ARRAY)
    formattedUrl = url
  }

  // Pull out any query params from the URL
  const parsedQueryParamsFromUrl = parseQuery(formattedUrl, false)

  // Convert the query params into an array (if it already isn't)
  const normalizedQueryParams = Array.isArray(queryParams) ? queryParams : [queryParams]

  // Serialize the query params to a query string
  const queryString = formatQuery([parsedQueryParamsFromUrl, ...normalizedQueryParams])

  // Finally build the URL by stripping out any query string from the URL and
  // appending the query string
  return splitOnQuery(formattedUrl).urlPath
      + (queryString ? '?' : '')
      + queryString
}

export default formatUrl
