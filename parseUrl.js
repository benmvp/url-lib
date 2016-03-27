/**
  Copyright (c) 2016 Ben Ilegbodu.
  Licensed under the MIT License (MIT).
  See: https://github.com/benmvp/url-lib.
  Adapted from the Uize.Url module, a part of the UIZE JavaScript Framework.
*/
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    }
    else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    }
	else {
        root.urllib.parseUrl = factory();
    }
}(this, function() {
    'use strict';

    var urlRegExp = /^(([^:\\\/]+:)\/\/(([^:\\\/]*)(:(\d+))?)?)?(([^\?#]*[\\\/])?(([^\\\/\?#]*?)(\.([^\.\?#]+))?))(\?([^#]*))?(#(.*))?$/,
        urlSegments = [     // * properties marked '*' are consistent with browser's location object
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
        var urlSegmentsMatch = url && url.match(urlRegExp),
            parsedUrl = {};

        function getUrlSegment(segmentNo) {
            return urlSegmentsMatch
                ? (urlSegmentsMatch[segmentNo] || '')
                : '';
        }

        for (var segmentNo = -1; ++segmentNo < urlSegments.length;) {
            var segmentName = urlSegments[segmentNo];

            if (segmentName) {
                parsedUrl[urlSegments[segmentNo]] = getUrlSegment(segmentNo);
            }
        }

        return parsedUrl;
    }

    return parseUrl;
}));
