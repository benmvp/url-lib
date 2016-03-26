/*!
  Copyright (c) 2016 Ben Ilegbodu.
  Licensed under the MIT License (MIT).
  See: https://github.com/benmvp/url-lib.
  Adapted from Uize.Url module.
*/

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    }
    else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    }
	else {
        root.urllib = factory();
    }
}(this, function () {
    'use strict';

    var cacheDefeatStrCallCount = 0;

    function _decode(str) {
        return str !== undefined ? decodeURIComponent(str) : '';
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
    * Returns a string value (generated using the time and a random number) that can be used as a query parameter value to cause a URL to be unique in order to defeat caching.
    * @returns {String} Cache defeat string
    */
    function getCacheDefeatStr() {
        // Three pieces of randomness:
        // - current time
        // - random number between 1-1000
        // - continuously incrementing counter
        return (+new Date) + '' + Math.round(Math.random() * 1000) + cacheDefeatStrCallCount++;
    }

    function formatQuery() {

    }

    function formatUrl() {

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

    function parseUrl() {

    }

    return {
        getCacheDefeatStr: getCacheDefeatStr,
        parseQuery: parseQuery,
        parseUrl: parseUrl,
        formatUrl: formatUrl,
        formatQuery: formatQuery
    };
}));
