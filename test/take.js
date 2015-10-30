'use strict'

require('../index')();
let assert = require('assert');

describe('test take operator', () => {
  let arr = [1, 2, 4, 5, 8, ['a', 'b', [[['a', ['a'], [2]]]]], 10, -1];
  it('should take 5 elements', () => {
    let t = arr.take(5).toArray();
    assert.equal(t.length, 5);
    assert.equal(t.last(), 8);
  });
  
  it('skip and take', () => {
    let t = arr.skip(5).take(1).flatten().toArray();
    assert.equal(t.length, 5);
    assert.equal(t[0], 'a');
    assert.deepEqual(t, ['a', 'b', 'a', 'a', 2]);
  });
});