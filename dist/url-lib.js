/**
  @preserve Copyright (c) 2016 Ben Ilegbodu.
  Licensed under the MIT License (MIT).
  See: https://github.com/benmvp/url-lib.
  Adapted from the Uize.Url module, a part of the UIZE JavaScript Framework.
*/
(function(factory) {
    /* istanbul ignore next */
    if (typeof define === 'function' && define.amd) {
        define(factory);
    }
    else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    }
	else {
        window.urllib = factory();
    }
})(function() {
    'use strict';

    var immutableEmptyObject = {},
        immutableEmptyArray = [],
        hasOwnProperty = immutableEmptyObject.hasOwnProperty;

    function _decode(str) {
        return str != null ? decodeURIComponent(str) : '';
    }

    function _encode(str) {
        return encodeURIComponent(str + '');
    }

    // Simplified Object.assign polyfill
    function _merge(target) {
        var output = new Object(target),
            argNo = 0,
            source,
            sourceKey;

        for (; ++argNo < arguments.length;) {
            source = arguments[argNo];

            if (source) {
                for (sourceKey in source) {
                    /* istanbul ignore else  */
                    if (hasOwnProperty.call(source, sourceKey)) {
                        output[sourceKey] = source[sourceKey];
                    }
                }
            }
        }

        return output;
    }

    function _splitOnQuery(url, favorQuery) {
        var urlString = (url || '') + '', // default to a string & then coerce to a string
            queryPos = urlString.indexOf('?');

        // If the URL doesn't have a "?" we have to decide how we want to handle the string.
        // If favorQuery === true, then we'll assume the entire string is the query string.
        // If !favorQuery then we set the queryPos to the end of the string (meaning the
        // query string is empty)
        if (queryPos < 0 && !favorQuery) {
            queryPos = urlString.length;
        }

        return {
            urlPath: urlString.slice(0, queryPos),
            queryString: urlString.slice(queryPos + 1)
        };
    }

    /**
    * Serializes the properties of a params object to produce a URL query string.
    * @param {object|object[]} urlParams - An object (or array of objects) representing the query params to serialize
    * @returns {string} Serialized query string
    */
    function formatQuery(urlParams) {
        var paramsObj = urlParams;

        if (Array.isArray(paramsObj)) {
            paramsObj = paramsObj.length < 2
                ? paramsObj[0]
                : _merge.apply(null, paramsObj);
        }

        paramsObj = paramsObj || immutableEmptyObject;

        return Object.keys(paramsObj)
            .reduce(function(prevUrlParamPairs, paramName) {
                var urlParamPairs = prevUrlParamPairs,
                    paramValue;

                if (paramName) {
                    paramValue = paramsObj[paramName];

                    if (paramValue != null) {
                        urlParamPairs.push(_encode(paramName) + '=' + _encode(paramValue));
                    }
                }

                return urlParamPairs;
            }, [])
            .join('&');
    }

    /**
    * Parses query parameters from a string, returning the query parameters as an object.
    * @param {string} strToParse - The string from which to parse query parameters
    * @param {boolean} [favorQuery=true] - Whether or not to treat the full string to parse as query parameters when it doesn't have "?" in it
    * @returns {object} Parsed query parameters
    */
    function parseQuery(strToParse, favorQuery) {
        // Ensure that all we parse is a query string
        var queryString = _splitOnQuery(strToParse, favorQuery !== false).queryString || '';

        return queryString
            .split('&')
            .reduce(function(prevUrlParams, serializedUrlParamPair) {
                var urlParams = prevUrlParams,
                    urlParamPair = serializedUrlParamPair.split('='),
                    urlParamNameEncoded = urlParamPair[0];

                if (urlParamNameEncoded) {
                    urlParams[_decode(urlParamNameEncoded)] = _decode(urlParamPair[1]);
                }

                return urlParams;
            }, {});
    }

    /**
    * Serializes the specified URL path with properties of a params object to produce a URL.
    * @param {string | array} urlPath - Base URL path
    * @param {object | object[]} urlParams - Query params to combine with base URL
    * @returns {string} Serialized URL
    */
    function formatUrl(urlPath, urlParams) {
        var formattedUrl = urlPath,
            queryParams = urlParams,
            parsedQueryParamsFromUrl,
            normalizedQueryParams,
            queryString;

        // if they passed an array as the first parameter, separate out the first
        // element (url) from the other elements (query params list)
        if (Array.isArray(formattedUrl)) {
            queryParams = formattedUrl.slice(1).concat(queryParams || immutableEmptyArray);
            formattedUrl = formattedUrl[0];
        }

        // Pull out any query params from the URL
        parsedQueryParamsFromUrl = parseQuery(formattedUrl, false);

        // Convert the query params into an array (if it already isn't)
        normalizedQueryParams = Array.isArray(queryParams) ? queryParams : [queryParams];

        // Merge the URL query params to the additional query params
        queryParams = [parsedQueryParamsFromUrl].concat(normalizedQueryParams);

        // Serialize the query params to a query string
        queryString = formatQuery(queryParams);

        // Finally build the URL by stripping out any query string from the URL and
        // appending the query string
        return _splitOnQuery(formattedUrl).urlPath
            + (queryString ? '?' : '')
            + queryString;
    }

    return {
        parseQuery: parseQuery,
        formatUrl: formatUrl,
        formatQuery: formatQuery
    };
});
/**
  Copyright (c) 2016 Ben Ilegbodu.
  Licensed under the MIT License (MIT).
  See: https://github.com/benmvp/url-lib.
  Adapted from the Uize.Url module, a part of the UIZE JavaScript Framework.
*/
(function(factory) {
    /* istanbul ignore next */
    if (typeof define === 'function' && define.amd) {
        define(factory);
    }
    else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    }
	else {
        window.urllib.getCacheDefeatStr = factory();
    }
})(function() {
    'use strict';

    var cacheDefeatStrCallCount = 0;

    /**
    * Returns a string value (generated using the time and a random number) that can be used as a query parameter value to cause a URL to be unique in order to defeat caching.
    * @returns {string} Cache defeat string
    */
    function getCacheDefeatStr() {
        // Three pieces of randomness:
        // - current time
        // - random number between 1-1000
        // - continuously incrementing counter
        return (+new Date()) + '' + Math.round(Math.random() * 1000) + cacheDefeatStrCallCount++;
    }

    return getCacheDefeatStr;
});
/**
  Copyright (c) 2016 Ben Ilegbodu.
  Licensed under the MIT License (MIT).
  See: https://github.com/benmvp/url-lib.
  Adapted from the Uize.Url module, a part of the UIZE JavaScript Framework.
*/
(function(factory) {
    /* istanbul ignore next */
    if (typeof define === 'function' && define.amd) {
        define(factory);
    }
    else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    }
	else {
        window.urllib.parseUrl = factory();
    }
})(function() {
    'use strict';

    var URL_REG_EXP = /^(([^:\\\/]+:)\/\/(([^:\\\/]*)(:(\d+))?)?)?(([^\?#]*[\\\/])?(([^\\\/\?#]*?)(\.([^\.\?#]+))?))(\?([^#]*))?(#(.*))?$/,
        URL_SEGMENTS = [     // * properties marked '*' are consistent with browser's location object
            'href',         // * eg. http://benmvp.com:80/docs/url-lib.html?param=value#anchor
            'fullDomain',   //   eg. http://benmvp.com:80
            'protocol',     // * eg. http:
            'host',         // * eg. benmvp.com:80
            'hostname',     // * eg. benmvp.com
            '',
            'port',         // * eg. 80
            'pathname',     // * eg. /docs/url-lib.html
            'folderPath',   //   eg. /docs/
            'file',         //   eg. url-lib.html
            'fileName',     //   eg. url-lib
            'extension',    //   eg. .html
            'fileType',     //   eg. html
            'search',       // * eg. ?param=value
            'query',        //   eg. param=value
            'hash',         // * eg. #anchor
            'anchor'        //   eg. anchor
        ];

    /**
    * Parses the specified URL string into an object containing properties for the various logical segments.
    * @param {string} url - URL to parse
    * @returns {object} URL segments as an object
    */
    function parseUrl(url) {
        var urlSegmentsMatch = url && url.match(URL_REG_EXP);

        function getUrlSegment(segmentNo) {
            return urlSegmentsMatch
                ? (urlSegmentsMatch[segmentNo] || '')
                : '';
        }

        return URL_SEGMENTS.reduce(function(prevParsedUrl, segmentName, segmentNo) {
            var parsedUrl = prevParsedUrl;

            if (segmentName) {
                parsedUrl[segmentName] = getUrlSegment(segmentNo);
            }

            return parsedUrl;
        }, {});
    }

    return parseUrl;
});
