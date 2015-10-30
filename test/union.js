'use strict'

require('../index')();
let assert = require('assert');

describe('test union operator', () => {
  let a1 = [1, 1, 2, 1, 2, 4, 2, 4];
  let a2 = [1, 3, 2, 1, 4, '1', '2'];
  
  it('uses default comparer', () => {
    let u = a1.union(a2).toArray();
    assert.equal(u.length, 6);
    assert.deepEqual(u, [1, 2, 4, 3, '1', '2']);
  });
  
  it('uses custom comparer', () => {
    let u = a1.union(a2, (i1, i2) => i1 == i2).toArray();
    assert.equal(u.length, 4);
    assert.deepEqual(u, [1, 2, 4, 3]);    
  })
});