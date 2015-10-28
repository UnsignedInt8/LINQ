'use strict'

require('../index')();
let assert = require('assert');

describe('test last operator', () => {
  it('should found last item', () => {
    let last = [1, 1, ',', undefined].last();
    assert.equal(last, undefined);
  });
  
  it('should be undefined', () => {
    let last = [].last();
    assert.equal(last, undefined);
  });
  
  it('should be default value', () => {
    let last = [].last(i => true, 2);
    assert.equal(last, 2);
  });
});