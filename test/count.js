'use strict'

require('../index')();
let assert = require('assert');

describe('test count operator', () => {
  it('should be 5', () => {
    let c = [1, 1, 1, 1, 1].count();
    assert.equal(c, 5);
  });
  
  it('should be 0', () => {
    let c = [null, '', 1, [], true].count(i => false);
    assert.equal(c, 0);
  })
});