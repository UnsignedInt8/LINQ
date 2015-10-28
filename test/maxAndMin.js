'use strict'

require('../index')();
let assert = require('assert');

describe('test max operator', () => {
  it('should be 5', () => {
    let max = [1, -Infinity, -.2, 2, '5'].max();
    assert.equal(max, '5');
  });
  
  it('should be 2', () => {
    let max = [1, -Infinity, -.2, 2, '5'].max(true);
    assert.equal(max, 2);
  });
  
  it('should be undefined', () => {
    let a = [].min();
    assert.equal(a, undefined);
  });
  
  it('should be -infinity', () => {
    let a = [-Infinity, 0].min();
    assert.equal(a, -Infinity);
  });
  
});