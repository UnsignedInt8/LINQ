'use strict'

let util = require('../../utilities');
let assert = require('assert');

describe('test ComparableSet', () => {
  it('', () => {
    let cs = new util.ComparableSet((item1, item) => item1 == item);
    cs.add(1);
    cs.add('1');
    
    assert.equal(cs.size, 1);
  });
});