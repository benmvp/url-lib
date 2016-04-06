/*eslint no-new-wrappers: "off"*/

var expect = require('chai').expect,
    urllib = require('../');

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
