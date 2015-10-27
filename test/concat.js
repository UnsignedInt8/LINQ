'use strict'

require('../index')();
let assert = require('assert');

describe('test concat operator', () => {
  it('should be a long array', () => {
    var a1 = [1, 2, 3];
    var a2 = ['a', 'b', 'c'];
    
    var a = a1.concatenate(a2).toArray();
    assert.deepEqual(a, a1.concat(a2));
  });
});