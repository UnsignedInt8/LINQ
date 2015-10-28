'use strict'

require('../index')();
let assert = require('assert');

describe('test except operator', () => {
  it('should be empty', () => {
    let a1 = [1, 2, 3];
    let a2 = [3, 2, 1, 2, 0];
    
    assert.deepEqual(a1.except(a2).toArray(), []);
  });
  
  it('should have 1 element', () => {
    let a1 = ['a', 'b', 1, null];
    let a2 = [null, 1, 'b'];
    
    assert.deepEqual(a1.except(a2).toArray(), ['a']);
  });
});