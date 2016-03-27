var expect = require('chai').expect,
    parseUrl = require('../parseUrl');

describe('parseUrl', function() {
    it('returns empty data when URL is empty string', function() {
        var parsedUrl = parseUrl('');

        expect(parsedUrl).to.deep.equal({
            href: '',
            fullDomain: '',
            protocol: '',
            host: '',
            hostname: '',
            port: '',
            pathname: '',
            folderPath: '',
            file: '',
            fileName: '',
            extension: '',
            fileType: '',
            search: '',
            query: '',
            hash: '',
            anchor: ''
        });
    });

    it('correctly parses a URL with protocol & hostname', function() {
        var parsedUrl = parseUrl('http://benmvp.com');

        expect(parsedUrl).to.deep.equal({
            href: 'http://benmvp.com',
            fullDomain: 'http://benmvp.com',
            protocol: 'http:',
            host: 'benmvp.com',
            hostname: 'benmvp.com',
            port: '',
            pathname: '',
            folderPath: '',
            file: '',
            fileName: '',
            extension: '',
            fileType: '',
            search: '',
            query: '',
            hash: '',
            anchor: ''
        });
    });

    it('correctly parses a URL with protocol, hostname & port', function() {
        var parsedUrl = parseUrl('http://benmvp.com:80');

        expect(parsedUrl).to.deep.equal({
            href: 'http://benmvp.com:80',
            fullDomain: 'http://benmvp.com:80',
            protocol: 'http:',
            host: 'benmvp.com:80',
            hostname: 'benmvp.com',
            port: '80',
            pathname: '',
            folderPath: '',
            file: '',
            fileName: '',
            extension: '',
            fileType: '',
            search: '',
            query: '',
            hash: '',
            anchor: ''
        });
    });

    it('correctly parses a URL with protocol, hostname & query', function() {
        var parsedUrl = parseUrl('http://benmvp.com/?param1=value&param2=value');

        expect(parsedUrl).to.deep.equal({
            href: 'http://benmvp.com/?param1=value&param2=value',
            fullDomain: 'http://benmvp.com',
            protocol: 'http:',
            host: 'benmvp.com',
            hostname: 'benmvp.com',
            port: '',
            pathname: '/',
            folderPath: '/',
            file: '',
            fileName: '',
            extension: '',
            fileType: '',
            search: '?param1=value&param2=value',
            query: 'param1=value&param2=value',
            hash: '',
            anchor: ''
        });
    });

    it('correctly parses a URL with protocol, hostname, hash', function() {
        var parsedUrl = parseUrl('http://benmvp.com/#anchor');

        expect(parsedUrl).to.deep.equal({
            href: 'http://benmvp.com/#anchor',
            fullDomain: 'http://benmvp.com',
            protocol: 'http:',
            host: 'benmvp.com',
            hostname: 'benmvp.com',
            port: '',
            pathname: '/',
            folderPath: '/',
            file: '',
            fileName: '',
            extension: '',
            fileType: '',
            search: '',
            query: '',
            hash: '#anchor',
            anchor: 'anchor'
        });
    });

    it('correctly parses a URL with protocol, hostname, query & hash', function() {
        var parsedUrl = parseUrl('http://benmvp.com/?param1=value&param2=value#anchor');

        expect(parsedUrl).to.deep.equal({
            href: 'http://benmvp.com/?param1=value&param2=value#anchor',
            fullDomain: 'http://benmvp.com',
            protocol: 'http:',
            host: 'benmvp.com',
            hostname: 'benmvp.com',
            port: '',
            pathname: '/',
            folderPath: '/',
            file: '',
            fileName: '',
            extension: '',
            fileType: '',
            search: '?param1=value&param2=value',
            query: 'param1=value&param2=value',
            hash: '#anchor',
            anchor: 'anchor'
        });
    });

    it('correctly parses a URL with hostname, fileName & extension', function() {
        var parsedUrl = parseUrl('benmvp.com/file.html');

        expect(parsedUrl).to.deep.equal({
            href: 'benmvp.com/file.html',
            fullDomain: '',
            protocol: '',
            host: '',
            hostname: '',
            port: '',
            pathname: 'benmvp.com/file.html',
            folderPath: 'benmvp.com/',
            file: 'file.html',
            fileName: 'file',
            extension: '.html',
            fileType: 'html',
            search: '',
            query: '',
            hash: '',
            anchor: ''
        });
    });

    it('correctly parses a URL with hostname, fileName, extension & query', function() {
        var parsedUrl = parseUrl('benmvp.com/file.html?param1=value&param2=value');

        expect(parsedUrl).to.deep.equal({
            href: 'benmvp.com/file.html?param1=value&param2=value',
            fullDomain: '',
            protocol: '',
            host: '',
            hostname: '',
            port: '',
            pathname: 'benmvp.com/file.html',
            folderPath: 'benmvp.com/',
            file: 'file.html',
            fileName: 'file',
            extension: '.html',
            fileType: 'html',
            search: '?param1=value&param2=value',
            query: 'param1=value&param2=value',
            hash: '',
            anchor: ''
        });
    });

    it('correctly parses a URL with hostname, fileName, extension & anchor', function() {
        var parsedUrl = parseUrl('benmvp.com/file.html#anchor');

        expect(parsedUrl).to.deep.equal({
            href: 'benmvp.com/file.html#anchor',
            fullDomain: '',
            protocol: '',
            host: '',
            hostname: '',
            port: '',
            pathname: 'benmvp.com/file.html',
            folderPath: 'benmvp.com/',
            file: 'file.html',
            fileName: 'file',
            extension: '.html',
            fileType: 'html',
            search: '',
            query: '',
            hash: '#anchor',
            anchor: 'anchor'
        });
    });

    it('correctly parses a URL with hostname, fileName, extension, query & anchor', function() {
        var parsedUrl = parseUrl('benmvp.com/file.html?param1=value&param2=value#anchor');

        expect(parsedUrl).to.deep.equal({
            href: 'benmvp.com/file.html?param1=value&param2=value#anchor',
            fullDomain: '',
            protocol: '',
            host: '',
            hostname: '',
            port: '',
            pathname: 'benmvp.com/file.html',
            folderPath: 'benmvp.com/',
            file: 'file.html',
            fileName: 'file',
            extension: '.html',
            fileType: 'html',
            search: '?param1=value&param2=value',
            query: 'param1=value&param2=value',
            hash: '#anchor',
            anchor: 'anchor'
        });
    });

    it('correctly parses a URL with hostname, folderPath, fileName, extension, query & anchor', function() {
        var parsedUrl = parseUrl('benmvp.com/blah/blah/file.html?param1=value&param2=value#anchor');

        expect(parsedUrl).to.deep.equal({
            href: 'benmvp.com/blah/blah/file.html?param1=value&param2=value#anchor',
            fullDomain: '',
            protocol: '',
            host: '',
            hostname: '',
            port: '',
            pathname: 'benmvp.com/blah/blah/file.html',
            folderPath: 'benmvp.com/blah/blah/',
            file: 'file.html',
            fileName: 'file',
            extension: '.html',
            fileType: 'html',
            search: '?param1=value&param2=value',
            query: 'param1=value&param2=value',
            hash: '#anchor',
            anchor: 'anchor'
        });
    });

    it('correctly parses a URL with hostname, port, folderPath, fileName, extension, query & anchor', function() {
        var parsedUrl = parseUrl('benmvp.com:80/blah/blah/file.html?param1=value&param2=value#anchor');

        expect(parsedUrl).to.deep.equal({
            href: 'benmvp.com:80/blah/blah/file.html?param1=value&param2=value#anchor',
            fullDomain: '',
            protocol: '',
            host: '',
            hostname: '',
            port: '',
            pathname: 'benmvp.com:80/blah/blah/file.html',
            folderPath: 'benmvp.com:80/blah/blah/',
            file: 'file.html',
            fileName: 'file',
            extension: '.html',
            fileType: 'html',
            search: '?param1=value&param2=value',
            query: 'param1=value&param2=value',
            hash: '#anchor',
            anchor: 'anchor'
        });
    });

    it('correctly parses a URL with protocol, hostname, port, folderPath, fileName, extension & query', function() {
        var parsedUrl = parseUrl('http://benmvp.com:80/blah/blah/file.html?param1=value&param2=value');

        expect(parsedUrl).to.deep.equal({
            href: 'http://benmvp.com:80/blah/blah/file.html?param1=value&param2=value',
            fullDomain: 'http://benmvp.com:80',
            protocol: 'http:',
            host: 'benmvp.com:80',
            hostname: 'benmvp.com',
            port: '80',
            pathname: '/blah/blah/file.html',
            folderPath: '/blah/blah/',
            file: 'file.html',
            fileName: 'file',
            extension: '.html',
            fileType: 'html',
            search: '?param1=value&param2=value',
            query: 'param1=value&param2=value',
            hash: '',
            anchor: ''
        });
    });

    it('correctly parses a URL with protocol, hostname, port, folderPath, fileName, extension & anchor', function() {
        var parsedUrl = parseUrl('http://benmvp.com:80/blah/blah/file.html#anchor');

        expect(parsedUrl).to.deep.equal({
            href: 'http://benmvp.com:80/blah/blah/file.html#anchor',
            fullDomain: 'http://benmvp.com:80',
            protocol: 'http:',
            host: 'benmvp.com:80',
            hostname: 'benmvp.com',
            port: '80',
            pathname: '/blah/blah/file.html',
            folderPath: '/blah/blah/',
            file: 'file.html',
            fileName: 'file',
            extension: '.html',
            fileType: 'html',
            search: '',
            query: '',
            hash: '#anchor',
            anchor: 'anchor'
        });
    });

    it('correctly parses a URL with protocol, hostname, port, folderPath, fileName, extension, query & anchor', function() {
        var parsedUrl = parseUrl('http://benmvp.com:80/blah/blah/file.html?param1=value&param2=value#anchor');

        expect(parsedUrl).to.deep.equal({
            href: 'http://benmvp.com:80/blah/blah/file.html?param1=value&param2=value#anchor',
            fullDomain: 'http://benmvp.com:80',
            protocol: 'http:',
            host: 'benmvp.com:80',
            hostname: 'benmvp.com',
            port: '80',
            pathname: '/blah/blah/file.html',
            folderPath: '/blah/blah/',
            file: 'file.html',
            fileName: 'file',
            extension: '.html',
            fileType: 'html',
            search: '?param1=value&param2=value',
            query: 'param1=value&param2=value',
            hash: '#anchor',
            anchor: 'anchor'
        });
    });

    it('correctly parses a URL with only absolute folderPath', function() {
        var parsedUrl = parseUrl('/blah/blah/');

        expect(parsedUrl).to.deep.equal({
            href: '/blah/blah/',
            fullDomain: '',
            protocol: '',
            host: '',
            hostname: '',
            port: '',
            pathname: '/blah/blah/',
            folderPath: '/blah/blah/',
            file: '',
            fileName: '',
            extension: '',
            fileType: '',
            search: '',
            query: '',
            hash: '',
            anchor: ''
        });
    });

    it('correctly parses a URL with absolute folderPath, fileName & extension', function() {
        var parsedUrl = parseUrl('/blah/blah/file.html');

        expect(parsedUrl).to.deep.equal({
            href: '/blah/blah/file.html',
            fullDomain: '',
            protocol: '',
            host: '',
            hostname: '',
            port: '',
            pathname: '/blah/blah/file.html',
            folderPath: '/blah/blah/',
            file: 'file.html',
            fileName: 'file',
            extension: '.html',
            fileType: 'html',
            search: '',
            query: '',
            hash: '',
            anchor: ''
        });
    });

    it('correctly parses a URL with absolute folderPath, fileName, extension & query', function() {
        var parsedUrl = parseUrl('/blah/blah/file.html?param1=value&param2=value');

        expect(parsedUrl).to.deep.equal({
            href: '/blah/blah/file.html?param1=value&param2=value',
            fullDomain: '',
            protocol: '',
            host: '',
            hostname: '',
            port: '',
            pathname: '/blah/blah/file.html',
            folderPath: '/blah/blah/',
            file: 'file.html',
            fileName: 'file',
            extension: '.html',
            fileType: 'html',
            search: '?param1=value&param2=value',
            query: 'param1=value&param2=value',
            hash: '',
            anchor: ''
        });
    });

    it('correctly parses a URL with absolute folderPath, fileName, extension & anchor', function() {
        var parsedUrl = parseUrl('/blah/blah/file.html#anchor');

        expect(parsedUrl).to.deep.equal({
            href: '/blah/blah/file.html#anchor',
            fullDomain: '',
            protocol: '',
            host: '',
            hostname: '',
            port: '',
            pathname: '/blah/blah/file.html',
            folderPath: '/blah/blah/',
            file: 'file.html',
            fileName: 'file',
            extension: '.html',
            fileType: 'html',
            search: '',
            query: '',
            hash: '#anchor',
            anchor: 'anchor'
        });
    });

    it('correctly parses a URL with absolute folderPath & query', function() {
        var parsedUrl = parseUrl('/blah/blah/?param1=value&param2=value');

        expect(parsedUrl).to.deep.equal({
            href: '/blah/blah/?param1=value&param2=value',
            fullDomain: '',
            protocol: '',
            host: '',
            hostname: '',
            port: '',
            pathname: '/blah/blah/',
            folderPath: '/blah/blah/',
            file: '',
            fileName: '',
            extension: '',
            fileType: '',
            search: '?param1=value&param2=value',
            query: 'param1=value&param2=value',
            hash: '',
            anchor: ''
        });
    });

    it('correctly parses a URL with absolute folderPath & anchor', function() {
        var parsedUrl = parseUrl('/blah/blah/#anchor');

        expect(parsedUrl).to.deep.equal({
            href: '/blah/blah/#anchor',
            fullDomain: '',
            protocol: '',
            host: '',
            hostname: '',
            port: '',
            pathname: '/blah/blah/',
            folderPath: '/blah/blah/',
            file: '',
            fileName: '',
            extension: '',
            fileType: '',
            search: '',
            query: '',
            hash: '#anchor',
            anchor: 'anchor'
        });
    });

    it('correctly parses a URL with absolute folderPath, query & anchor', function() {
        var parsedUrl = parseUrl('/blah/blah/?param1=value&param2=value#anchor');

        expect(parsedUrl).to.deep.equal({
            href: '/blah/blah/?param1=value&param2=value#anchor',
            fullDomain: '',
            protocol: '',
            host: '',
            hostname: '',
            port: '',
            pathname: '/blah/blah/',
            folderPath: '/blah/blah/',
            file: '',
            fileName: '',
            extension: '',
            fileType: '',
            search: '?param1=value&param2=value',
            query: 'param1=value&param2=value',
            hash: '#anchor',
            anchor: 'anchor'
        });
    });

    it('correctly parses a URL with absolute folderPath, fileName, extension, query & anchor', function() {
        var parsedUrl = parseUrl('/blah/blah/file.html?param1=value&param2=value#anchor');

        expect(parsedUrl).to.deep.equal({
            href: '/blah/blah/file.html?param1=value&param2=value#anchor',
            fullDomain: '',
            protocol: '',
            host: '',
            hostname: '',
            port: '',
            pathname: '/blah/blah/file.html',
            folderPath: '/blah/blah/',
            file: 'file.html',
            fileName: 'file',
            extension: '.html',
            fileType: 'html',
            search: '?param1=value&param2=value',
            query: 'param1=value&param2=value',
            hash: '#anchor',
            anchor: 'anchor'
        });
    });

    it('correctly parses a URL with relative folderPath, fileName & extension', function() {
        var parsedUrl = parseUrl('../../file.html');

        expect(parsedUrl).to.deep.equal({
            href: '../../file.html',
            fullDomain: '',
            protocol: '',
            host: '',
            hostname: '',
            port: '',
            pathname: '../../file.html',
            folderPath: '../../',
            file: 'file.html',
            fileName: 'file',
            extension: '.html',
            fileType: 'html',
            search: '',
            query: '',
            hash: '',
            anchor: ''
        });
    });

    it('correctly parses a URL with only query', function() {
        var parsedUrl = parseUrl('?param1=value&param2=value');

        expect(parsedUrl).to.deep.equal({
            href: '?param1=value&param2=value',
            fullDomain: '',
            protocol: '',
            host: '',
            hostname: '',
            port: '',
            pathname: '',
            folderPath: '',
            file: '',
            fileName: '',
            extension: '',
            fileType: '',
            search: '?param1=value&param2=value',
            query: 'param1=value&param2=value',
            hash: '',
            anchor: ''
        });
    });

    it('correctly parses a URL with only anchor', function() {
        var parsedUrl = parseUrl('#anchor');

        expect(parsedUrl).to.deep.equal({
            href: '#anchor',
            fullDomain: '',
            protocol: '',
            host: '',
            hostname: '',
            port: '',
            pathname: '',
            folderPath: '',
            file: '',
            fileName: '',
            extension: '',
            fileType: '',
            search: '',
            query: '',
            hash: '#anchor',
            anchor: 'anchor'
        });
    });

    it('correctly parses a URL with query & anchor', function() {
        var parsedUrl = parseUrl('?param1=value&param2=value#anchor');

        expect(parsedUrl).to.deep.equal({
            href: '?param1=value&param2=value#anchor',
            fullDomain: '',
            protocol: '',
            host: '',
            hostname: '',
            port: '',
            pathname: '',
            folderPath: '',
            file: '',
            fileName: '',
            extension: '',
            fileType: '',
            search: '?param1=value&param2=value',
            query: 'param1=value&param2=value',
            hash: '#anchor',
            anchor: 'anchor'
        });
    });

    it('correctly parses a URL with fileName & extension', function() {
        var parsedUrl = parseUrl('file.html');

        expect(parsedUrl).to.deep.equal({
            href: 'file.html',
            fullDomain: '',
            protocol: '',
            host: '',
            hostname: '',
            port: '',
            pathname: 'file.html',
            folderPath: '',
            file: 'file.html',
            fileName: 'file',
            extension: '.html',
            fileType: 'html',
            search: '',
            query: '',
            hash: '',
            anchor: ''
        });
    });

    it('correctly parses a URL with fileName, extension & query', function() {
        var parsedUrl = parseUrl('file.html?param1=value&param2=value');

        expect(parsedUrl).to.deep.equal({
            href: 'file.html?param1=value&param2=value',
            fullDomain: '',
            protocol: '',
            host: '',
            hostname: '',
            port: '',
            pathname: 'file.html',
            folderPath: '',
            file: 'file.html',
            fileName: 'file',
            extension: '.html',
            fileType: 'html',
            search: '?param1=value&param2=value',
            query: 'param1=value&param2=value',
            hash: '',
            anchor: ''
        });
    });

    it('correctly parses a URL with fileName, extension & anchor', function() {
        var parsedUrl = parseUrl('file.html#anchor');

        expect(parsedUrl).to.deep.equal({
            href: 'file.html#anchor',
            fullDomain: '',
            protocol: '',
            host: '',
            hostname: '',
            port: '',
            pathname: 'file.html',
            folderPath: '',
            file: 'file.html',
            fileName: 'file',
            extension: '.html',
            fileType: 'html',
            search: '',
            query: '',
            hash: '#anchor',
            anchor: 'anchor'
        });
    });

    it('correctly parses a URL with fileName, extension, query & anchor', function() {
        var parsedUrl = parseUrl('file.html?param1=value&param2=value#anchor');

        expect(parsedUrl).to.deep.equal({
            href: 'file.html?param1=value&param2=value#anchor',
            fullDomain: '',
            protocol: '',
            host: '',
            hostname: '',
            port: '',
            pathname: 'file.html',
            folderPath: '',
            file: 'file.html',
            fileName: 'file',
            extension: '.html',
            fileType: 'html',
            search: '?param1=value&param2=value',
            query: 'param1=value&param2=value',
            hash: '#anchor',
            anchor: 'anchor'
        });
    });

    it('incorrectly parses a URL with only hostname as a fileName', function() {
        var parsedUrl = parseUrl('benmvp.com');

        expect(parsedUrl).to.deep.equal({
            href: 'benmvp.com',
            fullDomain: '',
            protocol: '',
            host: '',
            hostname: '',
            port: '',
            pathname: 'benmvp.com',
            folderPath: '',
            file: 'benmvp.com',
            fileName: 'benmvp',
            extension: '.com',
            fileType: 'com',
            search: '',
            query: '',
            hash: '',
            anchor: ''
        });
    });

    it('incorrectly parses a URL with hostname & port as a fileName', function() {
        var parsedUrl = parseUrl('benmvp.com:80');

        expect(parsedUrl).to.deep.equal({
            href: 'benmvp.com:80',
            fullDomain: '',
            protocol: '',
            host: '',
            hostname: '',
            port: '',
            pathname: 'benmvp.com:80',
            folderPath: '',
            file: 'benmvp.com:80',
            fileName: 'benmvp',
            extension: '.com:80',
            fileType: 'com:80',
            search: '',
            query: '',
            hash: '',
            anchor: ''
        });
    });

    it('incorrectly parses a URL with hostname & query as a folderPath', function() {
        var parsedUrl = parseUrl('benmvp.com/?param1=value&param2=value');

        expect(parsedUrl).to.deep.equal({
            href: 'benmvp.com/?param1=value&param2=value',
            fullDomain: '',
            protocol: '',
            host: '',
            hostname: '',
            port: '',
            pathname: 'benmvp.com/',
            folderPath: 'benmvp.com/',
            file: '',
            fileName: '',
            extension: '',
            fileType: '',
            search: '?param1=value&param2=value',
            query: 'param1=value&param2=value',
            hash: '',
            anchor: ''
        });
    });

    it('incorrectly parses a URL with hostname & anchor as a folderPath', function() {
        var parsedUrl = parseUrl('benmvp.com/#anchor');

        expect(parsedUrl).to.deep.equal({
            href: 'benmvp.com/#anchor',
            fullDomain: '',
            protocol: '',
            host: '',
            hostname: '',
            port: '',
            pathname: 'benmvp.com/',
            folderPath: 'benmvp.com/',
            file: '',
            fileName: '',
            extension: '',
            fileType: '',
            search: '',
            query: '',
            hash: '#anchor',
            anchor: 'anchor'
        });
    });

    it('incorrectly parses a URL with hostname, query & anchor as a folderPath', function() {
        var parsedUrl = parseUrl('benmvp.com/?param1=value&param2=value#anchor');

        expect(parsedUrl).to.deep.equal({
            href: 'benmvp.com/?param1=value&param2=value#anchor',
            fullDomain: '',
            protocol: '',
            host: '',
            hostname: '',
            port: '',
            pathname: 'benmvp.com/',
            folderPath: 'benmvp.com/',
            file: '',
            fileName: '',
            extension: '',
            fileType: '',
            search: '?param1=value&param2=value',
            query: 'param1=value&param2=value',
            hash: '#anchor',
            anchor: 'anchor'
        });
    });

    it('incorrectly parses a URL with hostname, port & query as a folderPath', function() {
        var parsedUrl = parseUrl('benmvp.com:80/?param1=value&param2=value');

        expect(parsedUrl).to.deep.equal({
            href: 'benmvp.com:80/?param1=value&param2=value',
            fullDomain: '',
            protocol: '',
            host: '',
            hostname: '',
            port: '',
            pathname: 'benmvp.com:80/',
            folderPath: 'benmvp.com:80/',
            file: '',
            fileName: '',
            extension: '',
            fileType: '',
            search: '?param1=value&param2=value',
            query: 'param1=value&param2=value',
            hash: '',
            anchor: ''
        });
    });

    it('incorrectly parses a URL with hostname, port & anchor as a folderPath', function() {
        var parsedUrl = parseUrl('benmvp.com:80/#anchor');

        expect(parsedUrl).to.deep.equal({
            href: 'benmvp.com:80/#anchor',
            fullDomain: '',
            protocol: '',
            host: '',
            hostname: '',
            port: '',
            pathname: 'benmvp.com:80/',
            folderPath: 'benmvp.com:80/',
            file: '',
            fileName: '',
            extension: '',
            fileType: '',
            search: '',
            query: '',
            hash: '#anchor',
            anchor: 'anchor'
        });
    });

    it('incorrectly parses a URL with hostname, port, query & anchor as a folderPath', function() {
        var parsedUrl = parseUrl('benmvp.com:80/?param1=value&param2=value#anchor');

        expect(parsedUrl).to.deep.equal({
            href: 'benmvp.com:80/?param1=value&param2=value#anchor',
            fullDomain: '',
            protocol: '',
            host: '',
            hostname: '',
            port: '',
            pathname: 'benmvp.com:80/',
            folderPath: 'benmvp.com:80/',
            file: '',
            fileName: '',
            extension: '',
            fileType: '',
            search: '?param1=value&param2=value',
            query: 'param1=value&param2=value',
            hash: '#anchor',
            anchor: 'anchor'
        });
    });

    it('correctly parses query & anchor from badly formed protocol, query & anchor', function() {
        var parsedUrl = parseUrl('http:/?param1=value&param2=value#anchor');

        expect(parsedUrl).to.deep.equal({
            href: 'http:/?param1=value&param2=value#anchor',
            fullDomain: '',
            protocol: '',
            host: '',
            hostname: '',
            port: '',
            pathname: 'http:/',
            folderPath: 'http:/',
            file: '',
            fileName: '',
            extension: '',
            fileType: '',
            search: '?param1=value&param2=value',
            query: 'param1=value&param2=value',
            hash: '#anchor',
            anchor: 'anchor'
        });
    });

    it('correctly parses extension from badly formed protocol, fileName & extension', function() {
        var parsedUrl = parseUrl('http:file.html');

        expect(parsedUrl).to.deep.equal({
            href: 'http:file.html',
            fullDomain: '',
            protocol: '',
            host: '',
            hostname: '',
            port: '',
            pathname: 'http:file.html',
            folderPath: '',
            file: 'http:file.html',
            fileName: 'http:file',
            extension: '.html',
            fileType: 'html',
            search: '',
            query: '',
            hash: '',
            anchor: ''
        });
    });

    it('correctly parses fileName & extension from badly formed protocol, fileName & extension', function() {
        var parsedUrl = parseUrl('http//file.html');

        expect(parsedUrl).to.deep.equal({
            href: 'http//file.html',
            fullDomain: '',
            protocol: '',
            host: '',
            hostname: '',
            port: '',
            pathname: 'http//file.html',
            folderPath: 'http//',
            file: 'file.html',
            fileName: 'file',
            extension: '.html',
            fileType: 'html',
            search: '',
            query: '',
            hash: '',
            anchor: ''
        });
    });

    it('supports backlashes', function() {
        var parsedUrl = parseUrl('benmvp.com:80\\blah\\blah\\file.html?param1=value&param2=value#anchor');

        expect(parsedUrl).to.deep.equal({
            href: 'benmvp.com:80\\blah\\blah\\file.html?param1=value&param2=value#anchor',
            fullDomain: '',
            protocol: '',
            host: '',
            hostname: '',
            port: '',
            pathname: 'benmvp.com:80\\blah\\blah\\file.html',
            folderPath: 'benmvp.com:80\\blah\\blah\\',
            file: 'file.html',
            fileName: 'file',
            extension: '.html',
            fileType: 'html',
            search: '?param1=value&param2=value',
            query: 'param1=value&param2=value',
            hash: '#anchor',
            anchor: 'anchor'
        });
    });
});
