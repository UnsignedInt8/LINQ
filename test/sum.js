'use strict'

require('../index')();
let assert = require('assert');

describe('test sum operator', () => {
  it('strict mode is true', () => {
    let a = ['1', 1, 1].sum(true);
    assert(a === 2);
  });
  
  it('strict mode is false', () => {
    let a = ['1', 1, 1].sum();
    assert(a === 3);
  });
  
})