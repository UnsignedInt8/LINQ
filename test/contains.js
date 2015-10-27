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
  });
  
  let anArray = [1, '2', 3];
  it('should be true by equalityComparer', () => {
    let r = anArray.contains(2, (item1, item2) => item1 == item2);
    assert(r);
  });
  
  it('should be false by normal comparer', () => {
    let r = anArray.contains(2);
    assert.equal(r, false);
  });
});