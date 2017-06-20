'use strict'

require('../index')();
let assert = require('assert');

describe('test max operator', () => {
  it('should be 5', () => {
    let max = [1, -Infinity, -.2, 2, '5'].max();
    assert.equal(max, '5');
  });

  it('should be 5.1', () => {
    let max = [1, -Infinity, -.2, 2, '5.1'].max(i => Number.parseFloat(i));
    assert.equal(max, '5.1');
  });

  it('should be undefined', () => {
    let a = [].min();
    assert.equal(a, undefined);
  });

  it('should be -infinity', () => {
    let a = [-Infinity, 0].min();
    assert.equal(a, -Infinity);
  });

  it('minimum in map', () => {
    let m1 = new Map([['a', 1], ['aa', 2]]);
    let item = m1.min(item => item[1]);
    assert.deepEqual(item, ['a', 1]);
  });

  it('minimum of values()', () => {
    let m1 = new Map([['xx', 0], ['zzz', 1], ['ccc', 0], ['eee', -1]]);
    let min = Array.from(m1.values()).min();
    assert.equal(min, -1);
  });

  it('has one itme', () => {
    let a = [0].min();
    assert.equal(a === 0, true);
  })

  it('should be "z"', () => {
    let z = Array.from('abcdefgz').max();
    assert.equal(z, 'z');
  });
});