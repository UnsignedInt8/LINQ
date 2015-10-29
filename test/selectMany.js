'use strict'

require('../index')();
let assert = require('assert');

describe('test selectMany operator', () => {
  let multi = [[1, 2, 3], [4, 5 ,6], 7];
  it('should be a flatten list', () => {
    let fl = multi.selectMany(i => i).toArray();
    assert.deepEqual(fl, [1, 2, 3, 4, 5, 6, 7]);
    assert.equal(fl.length, 7);
  });
  
  let deep = [[1, [2, 3, 4], 5], [6, 7], 8];
  it('should have deep array in list', () => {
    let fl = deep.selectMany(i => i).toArray();
    assert.equal(fl.length, 6);
    assert.deepEqual(fl[1], [2, 3, 4]);
  });
  
  it('should be simple array', () => {
    let fl = deep.flatten().toArray();
    assert.equal(fl.length, 8);
    assert.equal(fl.last(), 8);
  });
  
  it('should be self', () => {
    let fl = [1, 2, 3].flatten().toArray();
    assert.deepEqual(fl, [1, 2, 3]);
  });
  
  it('is shallow flatten', () => {
    let sh = deep.flatten(false).toArray();
    assert.equal(sh.length, 6);
    assert.deepEqual(sh[1], [2, 3, 4]);
  });
});