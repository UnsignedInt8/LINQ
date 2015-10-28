'use strict'

require('../index')();
let assert = require('assert');

describe('test defaultIfEmpty operator', () => {
  it('should not be default', () => {
    let arr = [1, 2, 3];
    let x = arr.defaultIfEmpty('').toArray();
    assert.deepEqual(x, arr);
  });
  
  it('should be default', () => {
    let x = [].defaultIfEmpty('0').toArray();
    assert.deepEqual(x, ['0']);
  });
  
  it('should be undefined', () => {
    let x = [].defaultIfEmpty().toArray();
    assert.deepEqual(x, [undefined]);
  });
});