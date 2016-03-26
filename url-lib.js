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
    
    function getCacheDefeatStr() {
    }

    function formatQuery() {

    }

    function formatUrl() {

    }

    function parseQuery() {

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
