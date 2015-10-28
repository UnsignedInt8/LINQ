'use strict'

require('../index')();
let assert = require('assert');

describe('test distinct operator', () => {
  it('should not have duplicated values', () => {
    var obj = new Object();
    let arr = [1, 2, 2, 3, 2, 1, 9, 'x', 'y', 'x', 'a', obj, obj, 'z'].distinct().toArray();
    assert.deepEqual(arr, [1, 2, 3, 9, 'x', 'y', 'a', obj, 'z']);
  });
});