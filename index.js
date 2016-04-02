/**
  @preserve Copyright (c) 2016 Ben Ilegbodu.
  Licensed under the MIT License (MIT).
  See: https://github.com/benmvp/url-lib.
  Adapted from the Uize.Url module, a part of the UIZE JavaScript Framework.
*/
(function(global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    }
    else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    }
	else {
        global.urllib = factory();
    }
}(this, function() {
    'use strict';

    var hasOwnProperty = {}.hasOwnProperty,
        sacredEmptyArray = [];

    function _decode(str) {
        return str != null ? decodeURIComponent(str) : '';
    }

    function _encode(str) {
        return encodeURIComponent(str + '');
    }

    // Simplified Object.assign polyfill
    function _merge(target) {
        var output = new Object(target);

        for (var argNo = 0; ++argNo < arguments.length;) {
            var source = arguments[argNo];

            if (source) {
                for (var sourceKey in source) {
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
        var urlParamPairs = [],
            paramsObj = urlParams;

        if (Array.isArray(paramsObj)) {
            paramsObj = paramsObj.length < 2
                ? paramsObj[0]
                : _merge.apply(null, paramsObj);
        }

        for (var paramName in paramsObj) {
            if (paramName) {
                var paramValue = paramsObj[paramName];

                if (paramValue != null) {
                    urlParamPairs.push(_encode(paramName) + '=' + _encode(paramValue));
                }
            }
        }

        return urlParamPairs.join('&');
    }

    /**
    * Parses query parameters from a string, returning the query parameters as an object.
    * @param {string} strToParse - The string from which to parse query parameters
    * @param {boolean} [favorQuery=true] - Whether or not to treat the full string to parse as query parameters when it doesn't have "?" in it
    * @returns {object} Parsed query parameters
    */
    function parseQuery(strToParse, favorQuery) {
        var urlParams = {},

            // Ensure that all we parse is a query string
            queryString = _splitOnQuery(
                strToParse,
                favorQuery !== false
            ).queryString;

        if (queryString) {
            var urlParamPairs = queryString.split('&'),
                urlParamPairsLength = urlParamPairs.length;

            // Loop through all of the pairs and add to urlParams the decoded name & value
            for (var urlParamPairNo = -1; ++urlParamPairNo < urlParamPairsLength;) {
                var urlParamPair = urlParamPairs[urlParamPairNo].split('=');
                var urlParamNameEncoded = urlParamPair[0];

                if (urlParamNameEncoded) {
                    urlParams[_decode(urlParamNameEncoded)] = _decode(urlParamPair[1]);
                }
            }
        }

        return urlParams;
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
            queryParams = formattedUrl.slice(1).concat(queryParams || sacredEmptyArray);
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
}));
