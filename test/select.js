'use strict'

var assert = require('assert');
require('../index')();

describe('test select operator', () => {
  let n = [1, 2, 3, -1, 2, 1];
  
  it('should be equal', () => {
    assert.deepEqual(n.select(i => i * 2).toArray(), n.map(i => i * 2));
  });
});