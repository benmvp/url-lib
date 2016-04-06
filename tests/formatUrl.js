/*eslint no-new-wrappers: "off"*/

var expect = require('chai').expect,
    urllib = require('../');

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
