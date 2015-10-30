'use strict'

require('../index')();
let assert = require('assert');

describe('test skip operator', () => {
  let a = [1, 2, 3, 4, 5, 6, 7, 8];
  
  it('should skip 3 items', () => {
    let sk = a.skip(3).toArray();
    assert.equal(sk.length, 5);
    assert.equal(sk[0], 4);
  });
  
  it('should be self', () => {
    let sk = a.skip(-1).toArray();
    assert.deepEqual(sk, a.skip(0).toArray());
  });
  
  it('should be empty', () => {
    let sk = a.skip(Number.MAX_SAFE_INTEGER).toArray();
    assert.deepEqual(sk, []);
  });
  
  it('should be 8', () => {
    let sk = a.skip('7').toArray();
    assert.deepEqual(sk, [8]);
  });
  
  let n = [5000, 2500, 9000, 8000, 6500, 4000, 1500, 5500];
  it('should skip while index < 1000 * index', () => {
    let sk = n.skipWhile((i, index) => i > 1000 * index).toArray();
    assert.equal(sk.length, 3);
    assert.deepEqual(sk, n.skip(5).toArray());
  })
});