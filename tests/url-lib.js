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
});
