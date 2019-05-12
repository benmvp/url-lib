// Adapted from the Uize.Url module, a part of the UIZE JavaScript Framework.

type UrlSegment = 'href' | 'fullDomain' | 'protocol' | 'host' | 'hostname' | '' | 'port' | 'pathname' | 'folderPath' | 'file' | 'fileName' | 'extension' | 'fileType' | 'search' | 'query' | 'hash' | 'anchor'

type ParsedUrl = {
  [US in UrlSegment]: string
}

// eslint-disable-next-line no-useless-escape
const URL_REG_EXP = /^(([^:\\\/]+:)\/\/(([^:\\\/]*)(:(\d+))?)?)?(([^\?#]*[\\\/])?(([^\\\/\?#]*?)(\.([^\.\?#]+))?))(\?([^#]*))?(#(.*))?$/

// See docs for explanation of each segment
const URL_SEGMENTS = [
  'href',
  'fullDomain',
  'protocol',
  'host',
  'hostname',
  '',
  'port',
  'pathname',
  'folderPath',
  'file',
  'fileName',
  'extension',
  'fileType',
  'search',
  'query',
  'hash',
  'anchor',
] as UrlSegment[]

/**
* Parses the specified URL string into an object containing properties for the various logical segments.
* @param {string | null} [url] URL to parse
* @returns {ParsedUrl} Parsed URL as url segments object
*/
const parseUrl = (url?: string | null): ParsedUrl => {
  const urlSegmentsMatch = url && url.match(URL_REG_EXP)

  const getUrlSegment = (segmentNo: number): string => (
    urlSegmentsMatch ? (urlSegmentsMatch[segmentNo] || '') : ''
  )

  return URL_SEGMENTS.reduce((prevParsedUrl, segmentName, segmentNo) => {
    const parsedUrl = prevParsedUrl

    if (segmentName) {
      parsedUrl[segmentName] = getUrlSegment(segmentNo)
    }

    return parsedUrl
  }, {} as ParsedUrl)
}

export default parseUrl
