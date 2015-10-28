'use strict'

require('../index')();
let assert = require('assert');

describe('test intersect operator', () => {
  it('should be intersected', () => {
    let a1 = [1, 1, 2, '3', 4, '5', true, false, Number.MAX_SAFE_INTEGER];
    let a2 = [3, 4, 4, 1, true, Number.MAX_SAFE_INTEGER];
    
    let inter = a1.intersect(a2).toArray();
    assert.deepEqual(inter, [1, 4, true, Number.MAX_SAFE_INTEGER]);
  });
});