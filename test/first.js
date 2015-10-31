'use strict'

require('../index')();
let assert = require('assert');

describe('test first operator', () => {
  it('should be 5', () => {
    let a = [5, 'a'].first();
    assert.equal(a, 5);
  });
  
  it('should be undefined', () => {
    assert.throws(() => [].first(), Error);
  });
  
  it('should be first letter', () => {
    let a = [5, 0, 1, 'a', 'b', 'c', 'a'].first(i => i === 'a');
    assert.equal(a, 'a');
  });
  
  it('should be first "3" letter',  () => {
    let a = ['1', 2, '3'].first(i => i == 3);
    assert.equal(a, '3');
  });
  
  it('should be default value', () => {
    let d = [1, 2, 3].firstOrDefault(i => false, 5);
    assert.equal(d, 5);
  })
});