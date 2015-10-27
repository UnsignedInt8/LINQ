'use strict'

require('../index')();
let assert = require('assert');

describe('test any operator', () => {
  it('should return false', () => {
    let r = [0, 0, 0, 0, 0].any((i) => i !==0);
    assert.equal(r, false);
  });
  
  it('should return true', () => {
    let r = [1, 0, 0, 'x'].any((i) => i === 'x');
    assert(r);
  });
  
  it('should return false', () => {
    let r = [].any(i => false);
    assert.equal(r, false);
  })
})