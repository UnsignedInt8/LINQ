'use strict'

require('../index')();
let assert = require('assert');

describe('test all operator', () => {
  it('should return true', () => {
    let r = ['1', '2', '2', '4'].linq().all(i => i.length > 0);
    assert(r);
  });
  
  it('should return false', () => {
    let r = [1, 2, 3, '3', 4, '5'].linq().all(i => Number.isInteger(i));
    assert.equal(r, false);
  })
});