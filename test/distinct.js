'use strict'

require('../index')();
let assert = require('assert');

describe('test distinct operator', () => {
  it('should not have duplicated values', () => {
    var obj = new Object();
    let arr = [1, 2, 2, 3, 2, 1, 9, '1', 'x', 'y', 'x', 'a', obj, obj, 'z'].distinct().toArray();
    assert.deepEqual(arr, [1, 2, 3, 9, '1', 'x', 'y', 'a', obj, 'z']);
  });
  
  it('used by custom comparer', () => {
    var obj = new Object();
    let arr = [1, 2, 2, 3, 2, 1, 9, '1', 'x', 'y', 'x', 'a', obj, obj, 'z'].distinct((item1, item2) => item1 == item2).toArray();
    assert.deepEqual(arr, [1, 2, 3, 9, 'x', 'y', 'a', obj, 'z']);
  })
});