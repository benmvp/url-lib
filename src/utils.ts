import {UrlParamValue} from './types'

interface SplitQuery {
  urlPath: string
  queryString: string
}

export const splitOnQuery = (url = '', favorQuery = false): SplitQuery => {
  const urlString = `${url}`
  let queryPos = urlString.indexOf('?')

  // If the URL doesn't have a "?" we have to decide how we want to handle the string.
  // If favorQuery === true, then we'll assume the entire string is the query string.
  // If !favorQuery then we set the queryPos to the end of the string (meaning the
  // query string is empty)
  if (queryPos < 0 && !favorQuery) {
    queryPos = urlString.length
  }

  return {
    urlPath: urlString.slice(0, queryPos),
    queryString: urlString.slice(queryPos + 1),
  }
}

export const encode = (str: UrlParamValue): string => encodeURIComponent(`${str}`)

export const decode = (str: string): string => str != null ? decodeURIComponent(str) : ''
