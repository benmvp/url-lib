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
        root.urllib.getCacheDefeatStr = factory();
    }
}(this, function() {
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
}));
