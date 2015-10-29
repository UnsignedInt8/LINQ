'use strict'

require('../index')();
let assert = require('assert');

describe('test sequenceEqual operator', () => {
  let a1 = ['1', '2', '3', 4, 5];
  let a2 = ['1', '2', '3', 4, 5];
  
  it('should be equal', () => {
    assert(a1.sequenceEqual(a2));
  });
  
  it('should not be equal', () => {
    assert(a1.sequenceEqual(['1', '2', '3', 4]) === false);
  });
});