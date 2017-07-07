var fortune = require('../lib/fortune.js');
var expect = require('chai').expect;

suite('Fortunes tests', function () {
    test('getFortune() should return fortune', function () {
        expect(typeof fortune.getFortune() === 'string');
    });
});
