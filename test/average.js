'use strict'

require('../index')();
let assert = require('assert');

describe('test average operator', () => {
  it('should be 30', () => {
    let num = ['30', 0, 60.0, 20, '40'].average();
    assert.equal(num, 30);
  });
  
  it('should be 16 with strict mode', () => {
    let num = ['30', '0', 60.0, 20, '40'].average(true);
    assert.equal(num, 16);
  });
  
  it('should be NaN', () => {
    let a = ['x', '', null, undefined, 2, 4].average();
    assert(Number.isNaN(a));
  });
  
  it('should be NaN', () => {
    let inf = [Infinity, -Infinity, Infinity].average();
    assert(Number.isNaN(inf)); 
  });
  
  it('should be Infinity', () => {
    let inf = [Number.MAX_VALUE, Number.MAX_VALUE, -Number.MAX_VALUE].average();
    assert.equal(inf, Infinity);
  });
  
  it('should be 0', () => {
    let z = [Number.MAX_VALUE, -Number.MAX_VALUE].average();
    assert.equal(z, 0);
  });
  
  it('should be NaN', () => {
    let n = [].average();
    assert(Number.isNaN(n));
  })
});