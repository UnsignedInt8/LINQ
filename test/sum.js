'use strict'

require('../index')();
let assert = require('assert');

describe('test sum operator', () => {
  it('strict mode is true', () => {
    let a = ['1', 1, 1].sum(i => typeof i === 'string' ? 0 : i);
    assert(a === 2);
  });
  
  it('normal sum', () => {
    let a = ['1', 1, 1].sum();
    assert(a === 3);
  });
  
  it('should < 0', () => {
    let a = [-Infinity, -Infinity].sum();
    assert(a < 0);
  });
  
})