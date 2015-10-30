'use strict'

require('../index')();
let assert = require('assert');

describe('test zip operator', () => {
  let a1 = [1, 2, 3, 4];
  let w1 = [ "one", "two", "three" ];
  
  it('zip', () => {
    let z = a1.zip(w1, (i1, i2) => `${i1} ${i2}`).toArray();
    assert.equal(z.length, 3);
    assert.equal(z[0], '1 one');
  });
  
  it('zip2', () => {
    let z = w1.zip(a1, (i1, i2) => `${i1} ${i2}`).toArray();
    assert.equal(z[0], 'one 1');
    assert.equal(z.length, 3);
  });
  
  it('has no selector', () => {
    let z = a1.zip(w1).toArray();
    assert.deepEqual(z[0], [1, 'one']);
    assert.equal(z.length, 3);
  })
});