var expect = require('chai').expect,
    urllib = require('../url-lib');

describe('url-lib', function() {
    describe('getCacheDefeatStr', function() {
        it('returns a non-empty string', function() {
            var cacheDefeatStr = urllib.getCacheDefeatStr();

            expect(cacheDefeatStr).to.be.a('string');
            expect(cacheDefeatStr).to.not.be.empty;
        });

        it('returns different values for successive calls', function() {
            var results = {};

            for (var callNo =-1; ++callNo < 10;) {
                results[urllib.getCacheDefeatStr()] = 1;
            }

            expect(Object.keys(results).length).to.equal(10);
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

            expect(paramsObj).to.deep.equal({param1Name: 'param1Value', param2Name: 'param2Value', param3Name: 'param3Value'});
        });

        it('parses a full URL correctly', function() {
            var paramsObj = urllib.parseQuery('http://www.benmvp.com?param1Name=param1Value&param2Name=param2Value&param3Name=param3Value');

            expect(paramsObj).to.deep.equal({param1Name: 'param1Value', param2Name: 'param2Value', param3Name: 'param3Value'});
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

            expect(paramsObj).to.deep.equal({param: 'value', PARAM: 'VALUE'});
        });

        it('uses the last value when the same-named param occurs multiple times', function() {
            var paramsObj = urllib.parseQuery('foo=bar&foo=pub&foo=spacebar');

            expect(paramsObj).to.deep.equal({foo: 'spacebar'});
        });
    });

    describe('formatQuery', function() {
        it('returns an empty string when no parameters are passed', function() {
            var queryString = urllib.formatQuery();

            expect(queryString).to.equal('');
        });

        it('returns an empty string when `null` is passed passed', function() {
            var queryString = urllib.formatQuery(null);

            expect(queryString).to.equal('');
        });

        it('returns an empty string when `undefined` is passed passed', function() {
            var queryString = urllib.formatQuery(undefined);

            expect(queryString).to.equal('');
        });

        it('returns an empty string when empty query params is passed passed', function() {
            var queryString = urllib.formatQuery({});

            expect(queryString).to.equal('');
        });

        it('formats a query params object with a single param correctly', function() {
            var queryString = urllib.formatQuery({paramName: 'paramValue'});

            expect(queryString).to.equal('paramName=paramValue');
        });

        it('ignores property keys that are empty', function() {
            var queryString = urllib.formatQuery({'': 'peekaboo', foo: 'bar'});

            expect(queryString).to.equal('foo=bar');
        });

        it('ignores null or undefined propery values', function() {
            var queryString = urllib.formatQuery({param1: undefined, param2: null, param3: 'hello'});

            expect(queryString).to.equal('param3=hello');
        });

        it('does not ignore property values that are empty strings', function() {
            var queryString = urllib.formatQuery({param1: '', param2: ''});

            expect(queryString).to.equal('param1=&param2=');
        });

        it('formats multiple query params correctly', function() {
            var queryString = urllib.formatQuery({param1Name: 'param1Value', param2Name: 'param2Value', param3Name: 'param3Value'});

            expect(queryString).to.equal('param1Name=param1Value&param2Name=param2Value&param3Name=param3Value');
        });

        it('URI encodes property values', function() {
            var queryString = urllib.formatQuery({
                param1: '`@#$%^&+=[]{}|\\:;"<>,?/ ',
                param2: 'hello'
            });

            expect(queryString).to.equal('param1=%60%40%23%24%25%5E%26%2B%3D%5B%5D%7B%7D%7C%5C%3A%3B%22%3C%3E%2C%3F%2F%20&param2=hello');
        });

        it('URI encodes property keys', function() {
            var queryString = urllib.formatQuery({'`@#$%^&+=[]{}|\\:;"<>,?/ ': 'hello'});

            expect(queryString).to.equal('%60%40%23%24%25%5E%26%2B%3D%5B%5D%7B%7D%7C%5C%3A%3B%22%3C%3E%2C%3F%2F%20=hello');
        });

        it('supports a space as a property key', function() {
            var queryString = urllib.formatQuery({' ': 'space, the final frontier'});

            expect(queryString).to.equal('%20=space%2C%20the%20final%20frontier');
        });

        it('respects case-sensitivity of property keys and values', function() {
            var queryString = urllib.formatQuery({param: 'value', PARAM: 'VALUE'});

            expect(queryString).to.equal('param=value&PARAM=VALUE');
        });

        it('coerces non string property values to strings', function() {
            var queryString = urllib.formatQuery({
                p1: true,
                p2: new Boolean(false),
                p3: 42,
                p4: new Number(42),
                p5: NaN,
                p6: Infinity,
                p7: 'hello',
                p8: new String('hello'),
                p9: {
                    toString: function() {
                        return 'hello';
                    }
                },
                p10: [1, 2, 3, 4]
            });

            expect(queryString).to.equal('p1=true&p2=false&p3=42&p4=42&p5=NaN&p6=Infinity&p7=hello&p8=hello&p9=hello&p10=1%2C2%2C3%2C4');
        });

        it('returns an empty string for an empty array', function() {
            var queryString = urllib.formatQuery([]);

            expect(queryString).to.equal('');
        });

        it('supports an array containing a single params object element', function() {
            var queryString = urllib.formatQuery([{param1Name: 'param1Value', param2Name: 'param2Value', param3Name: 'param3Value'}]);

            expect(queryString).to.equal('param1Name=param1Value&param2Name=param2Value&param3Name=param3Value');
        });

        it('supports an array containing a multiple params object elements', function() {
            var queryString = urllib.formatQuery([{param1Name: 'param1Value'}, {param2Name: 'param2Value'}, {param3Name: 'param3Value'}]);

            expect(queryString).to.equal('param1Name=param1Value&param2Name=param2Value&param3Name=param3Value');
        });

        it('uses the last param object when multiple have the same property key', function() {
            var queryString = urllib.formatQuery([{p1: 'obj1', p2: 'obj1', p3: 'obj1'}, {p2: 'obj2', p3: 'obj2'}, {p3: 'obj3'}]);

            expect(queryString).to.equal('p1=obj1&p2=obj2&p3=obj3');
        });
    });

    describe('formatUrl', function() {
        it('returns an empty string when nothing is passed', function() {
            var url = urllib.formatUrl();

            expect(url).to.equal('');
        });

        it('returns an empty string when an empty URL is passed', function() {
            var url = urllib.formatUrl('');

            expect(url).to.equal('');
        });

        it('returns the URL when a URL with no query string is passed', function() {
            var url = urllib.formatUrl('http://www.benmvp.com');

            expect(url).to.equal('http://www.benmvp.com');
        });

        it('returns the URL without "?" when a URL with "?" included (but no query string)', function() {
            var url = urllib.formatUrl('http://www.benmvp.com?');

            expect(url).to.equal('http://www.benmvp.com');
        });

        it('returns the same URL with query string when called with a URL with query string', function() {
            var url = urllib.formatUrl('http://www.benmvp.com?param1Name=param1Value&param2Name=param2Value');

            expect(url).to.equal('http://www.benmvp.com?param1Name=param1Value&param2Name=param2Value');
        });

        it('correctly handles passing an empty URL, but with a query params object', function() {
            var url = urllib.formatUrl('', {
                param1Name: 'param1Value',
                param2Name: 'param2Value',
                param3Name: 'param3Value'});

            expect(url).to.equal('?param1Name=param1Value&param2Name=param2Value&param3Name=param3Value');
        });

        it('correctly handles passing an non-empty URL (without query string) with a query params object', function() {
            var url = urllib.formatUrl('http://www.benmvp.com/search', {
                category: 'holiday',
                type: 'all',
                results: 20
            });

            expect(url).to.equal('http://www.benmvp.com/search?category=holiday&type=all&results=20');
        });

        it('correctly handles passing an non-empty URL (with `?`) and a query params object', function() {
            var url = urllib.formatUrl('http://www.benmvp.com/search?', {
                category: 'holiday',
                type: 'all',
                results: 20
            });

            expect(url).to.equal('http://www.benmvp.com/search?category=holiday&type=all&results=20');
        });

        it('correctly handles various different types of values in params object', function() {
            var url = urllib.formatUrl('http://www.benmvp.com', {
                p1: true,
                p2: new Boolean(false),
                p3: 42,
                p4: new Number(42),
                p5: NaN,
                p6: Infinity,
                p7: 'hello',
                p8: new String('hello'),
                p9: {
                    toString: function() {
                        return 'hello';
                    }
                },
                p10: [1, 2, 3, 4]});

            expect(url).to.equal('http://www.benmvp.com?p1=true&p2=false&p3=42&p4=42&p5=NaN&p6=Infinity&p7=hello&p8=hello&p9=hello&p10=1%2C2%2C3%2C4');
        });

        it('correctly handles param name & values that need to be URI encoded', function() {
            var url = urllib.formatUrl('http://www.benmvp.com', {
                param1: '`@#$%^&+=[]{}|\\:;"<>,?/ ',
                '`@#$%^&+=[]{}|\\:;"<>,?/ ': 'hello'});

            expect(url).to.equal('http://www.benmvp.com?param1=%60%40%23%24%25%5E%26%2B%3D%5B%5D%7B%7D%7C%5C%3A%3B%22%3C%3E%2C%3F%2F%20&%60%40%23%24%25%5E%26%2B%3D%5B%5D%7B%7D%7C%5C%3A%3B%22%3C%3E%2C%3F%2F%20=hello');
        });

        it('correctly merges query params object into a URL that already has a query string', function() {
            var url = urllib.formatUrl('http://www.benmvp.com/search?sort=recent&results=20&pg=1', {
                sort: 'popular',
                category: 'holiday',
                type: 'all',
                results: 100
            });

            expect(url).to.equal('http://www.benmvp.com/search?sort=popular&results=100&pg=1&category=holiday&type=all');
        });

        it('correctly removes `null` query param values from URL', function() {
            var url = urllib.formatUrl('http://www.benmvp.com/search?sort=recent&results=20&pg=1', {
                sort: null,
                category: null,
                type: 'all',
                results: null
            });

            expect(url).to.equal('http://www.benmvp.com/search?pg=1&type=all');
        });

        it('correctly handles URL with an array of query params objects', function() {
            var url = urllib.formatUrl('http://www.benmvp.com', [
                {param1Name: 'param1Value'},
                {param2Name: 'param2Value'},
                {param3Name: 'param3Value'}]);

            expect(url).to.equal('http://www.benmvp.com?param1Name=param1Value&param2Name=param2Value&param3Name=param3Value');
        });

        it('correctly overrides in later query params objects with duplicate names', function() {
            var url = urllib.formatUrl('http://www.benmvp.com', [
                {p1: 'obj1', p2: 'obj1', p3: 'obj1'},
                {p2: 'obj2', p3: 'obj2'},
                {p3: 'obj3'}]);

            expect(url).to.equal('http://www.benmvp.com?p1=obj1&p2=obj2&p3=obj3');
        });

        it('correctly handles an array of just a URL', function() {
            var url = urllib.formatUrl(['http://www.benmvp.com']);

            expect(url).to.equal('http://www.benmvp.com');
        });

        it('correctly handles an array of a URL and multiple query params objects', function() {
            var url = urllib.formatUrl([
                'http://www.benmvp.com',
                {param1Name: 'param1Value'},
                {param2Name: 'param2Value'},
                {param3Name: 'param3Value'}]);

            expect(url).to.equal('http://www.benmvp.com?param1Name=param1Value&param2Name=param2Value&param3Name=param3Value');
        });

        it('correctly handles an array of a URL and multiple query params object plus an additional query params object', function() {
            var url = urllib.formatUrl(
                [
                    'http://www.benmvp.com',
                    {param1Name: 'param1Value'},
                    {param2Name: 'param2Value'}
                ],
                {param3Name: 'param3Value'}
            );

            expect(url).to.equal('http://www.benmvp.com?param1Name=param1Value&param2Name=param2Value&param3Name=param3Value');
        });

        it('correctly handles an array of a URL and multiple query params object plus an additional array of query params objects', function() {
            var url = urllib.formatUrl(
                [
                    'http://www.benmvp.com',
                    {param1Name: 'param1Value'}
                ],
                [
                    {param2Name: 'param2Value'},
                    {param3Name: 'param3Value'}
                ]
            );

            expect(url).to.equal('http://www.benmvp.com?param1Name=param1Value&param2Name=param2Value&param3Name=param3Value');
        });

        it('correctly handles an array of a URL and multiple query params objects (with null values)', function() {
            var url = urllib.formatUrl([
                'http://www.benmvp.com',
                {param1Name: 'param1Value'},
                null,
                {param3Name: 'param3Value'}]);

            expect(url).to.equal('http://www.benmvp.com?param1Name=param1Value&param3Name=param3Value');
        });

        it('correctly handles an array of a URL and multiple query params object plus an additional array of query params objects (with null values)', function() {
            var url = urllib.formatUrl(
                [
                    'http://www.benmvp.com',
                    null
                ],
                [
                    {param2Name: 'param2Value'},
                    null
                ]
            );

            expect(url).to.equal('http://www.benmvp.com?param2Name=param2Value');
        });
    });
});
