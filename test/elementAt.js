'use strict'

require('../index')();
let assert = require('assert');

describe('test elementAt/elementAtOrDefault operator', () => {
  it('should be 1', () => {
    let el = [0, 0, 0, 1, 'a', 2, 1, '1'].elementAt(6);
    assert.equal(el, 1);
  });
  
  it('should be undefined', () => {
    let n = [].elementAt(-10);
    assert.equal(n, undefined);
  });
  
  it('should be default value', () => {
    let dv = [].elementAtOrDefault(10, 'defaultValue');
    assert.equal(dv, 'defaultValue');
  })
});