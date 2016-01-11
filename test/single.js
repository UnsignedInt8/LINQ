'use strict'

require('../index')();
let assert = require('assert');

describe('test single operator', () => {
  let arr = [1, '2', 3, 3, 2, ''];
  
  it ('should be single value', () => {
    let s = arr.single(i => i === 2);
    assert(s === 2);
  });
  
  it('should be failed', () => {
    assert.throws(() => {
      arr.single(i => i == 2);
    }, Error);
  });
  
  it('should be default value', () => {
    let dv = arr.single(i => i === 5, 0);
    assert.equal(dv, 0);
  });
  
  it('should be default value', () => {
    let df = arr.singleOrDefault(i => i === 8, 0);
    assert.equal(df, 0);
  });
});