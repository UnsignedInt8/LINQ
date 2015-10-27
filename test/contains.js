'use strict'

require('../index')();
let assert = require('assert');

describe('test contains operator', () => {
  it('should be true', () => {
    let a = ['', '23', 'xx'].contains('');
    assert(a);
  });
  
  it('should be false', () => {
    let a = Array.from('abcdedfghji').contains('z');
    assert.equal(a, false);
  })
});