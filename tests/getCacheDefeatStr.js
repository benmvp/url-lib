var expect = require('chai').expect,
    getCacheDefeatStr = require('../getCacheDefeatStr');

describe('getCacheDefeatStr', function() {
    it('returns a non-empty string', function() {
        var cacheDefeatStr = getCacheDefeatStr();

        expect(cacheDefeatStr).to.be.a('string');
        expect(cacheDefeatStr).to.not.be.empty;
    });

    it('returns different values for successive calls', function() {
        var results = {};

        for (var callNo =-1; ++callNo < 10;) {
            results[getCacheDefeatStr()] = 1;
        }

        expect(Object.keys(results).length).to.equal(10);
    });
});
