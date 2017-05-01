'use strict'

var assert = require('assert');
require('../index')();

describe('test select operator', () => {
  let n = [1, 2, 3, -1, 2, 1];

  it('should be equal', () => {
    assert.deepEqual(n.select(i => i * 2).toArray(), n.map(i => i * 2));
  });

  it('selects map', () => {
    let m1 = new Map();
    m1.set('a', 1);
    m1.set('b', 2);
    m1.set('z', 3);

    let m2 = new Map();
    m2.set('b', 2);
    m2.set('c', 3);

    let result = m1.except(m2, ([k1, v1], [k2, v2]) => k1 === k2).select(item => item[0]).toArray();
    assert.deepEqual(result, ['a', 'z']);
  });
});