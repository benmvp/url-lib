var expect = require('chai').expect,
    _ = require('lodash'),
    urllib = require('../url-lib');

describe('url-lib', function() {
    describe('getCacheDefeatStr', function() {
        it('returns a non-empty string', function() {
            var cacheDefeatStr = urllib.getCacheDefeatStr();

            expect(cacheDefeatStr).to.be.a('string');
            expect(cacheDefeatStr).to.not.be.empty;
        });

        it('returns different values for successive calls', function() {
            var results = _.uniq(_.times(10, urllib.getCacheDefeatStr));

            expect(results.length).to.equal(10);
        });
    });

    describe('parseQuery', function() {
        it('returns an empty object when no parameters are passed', function() {
            var paramsObj = urllib.parseQuery();

            expect(paramsObj).to.deep.equal({});
        });

        it('returns an empty object when passed an empty query string', function() {
            var paramsObj = urllib.parseQuery('');

            expect(paramsObj).to.deep.equal({});
        });

        it('returns an empty object when query string is just "?"', function() {
            var paramsObj = urllib.parseQuery('?');

            expect(paramsObj).to.deep.equal({});
        });

        it('returns an empty object when URL just has "?"', function() {
            var paramsObj = urllib.parseQuery('http://www.benmvp.com?');

            expect(paramsObj).to.deep.equal({});
        });

        it('assumes a string with no "?" is a query string', function() {
            var paramsObj = urllib.parseQuery('paramName=paramValue');

            expect(paramsObj).to.deep.equal({paramName: 'paramValue'});
        });

        it('parses a query string with multiple params correctly', function() {
            var paramsObj = urllib.parseQuery('param1Name=param1Value&param2Name=param2Value&param3Name=param3Value');

            expect(paramsObj).to.deep.equal({param1Name: 'param1Value', param2Name: 'param2Value',param3Name: 'param3Value'});
        });

        it('parses a full URL correctly', function() {
            var paramsObj = urllib.parseQuery('http://www.benmvp.com?param1Name=param1Value&param2Name=param2Value&param3Name=param3Value');

            expect(paramsObj).to.deep.equal({param1Name: 'param1Value', param2Name: 'param2Value',param3Name: 'param3Value'});
        });

        it('defaults params with no value specified to empty strings', function() {
            var paramsObj = urllib.parseQuery('param1=&param2=');

            expect(paramsObj).to.deep.equal({param1: '', param2: ''});
        });

        it('defaults params with no equal sign to empty strings', function() {
            var paramsObj = urllib.parseQuery('param1&param2');

            expect(paramsObj).to.deep.equal({param1: '', param2: ''});
        });

        it('defaults params with some using equal signs and others not all to empty strings', function() {
            var paramsObj = urllib.parseQuery('param1&param2=&param3');

            expect(paramsObj).to.deep.equal({param1: '', param2: '', param3: ''});
        });

        it('does not coerce values from strings', function() {
            var paramsObj = urllib.parseQuery('param1=true&param2=42&param3=NaN&param4=Infinity&param5={}&param6=[]&param7=null&param8=undefined');

            expect(paramsObj).to.deep.equal({
                param1: 'true',
                param2: '42',
                param3: 'NaN',
                param4: 'Infinity',
                param5: '{}',
                param6: '[]',
                param7: 'null',
                param8: 'undefined'
            });
        });

        it('decodes param values that are URI-encoded', function() {
            var paramsObj = urllib.parseQuery('param1=%60%40%23%24%25%5E%26%2B%3D%5B%5D%7B%7D%7C%5C%3A%3B%22%3C%3E%2C%3F%2F%20&param2=hello');

            expect(paramsObj).to.deep.equal({
                param1: '`@#$%^&+=[]{}|\\:;"<>,?/ ',
                param2: 'hello'
            });
        });

        it('decodes param names that are URI-encoded', function() {
            var paramsObj = urllib.parseQuery('%60%40%23%24%25%5E%26%2B%3D%5B%5D%7B%7D%7C%5C%3A%3B%22%3C%3E%2C%3F%2F%20=hello');

            expect(paramsObj).to.deep.equal({'`@#$%^&+=[]{}|\\:;"<>,?/ ': 'hello'});
        });

        it('ignores params without a name and does not include in resultant object', function() {
            var paramsObj = urllib.parseQuery('http://www.uize.com?=blah&param=foo');

            expect(paramsObj).to.deep.equal({param: 'foo'});
        });

        it('supports using a space as a param name', function() {
            var paramsObj = urllib.parseQuery('%20=space%2C%20the%20final%20frontier');

            expect(paramsObj).to.deep.equal({' ': 'space, the final frontier'});
        });

        it('respects case-sensitivity of param names and values', function() {
            var paramsObj = urllib.parseQuery('param=value&PARAM=VALUE');

            expect(paramsObj).to.deep.equal({param: 'value',PARAM: 'VALUE'});
        });

        it('uses the last value when the same-named param occurs multiple times', function() {
            var paramsObj = urllib.parseQuery('foo=bar&foo=pub&foo=spacebar');

            expect(paramsObj).to.deep.equal({foo: 'spacebar'});
        });
    });
});
