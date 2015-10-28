'use strict'

require('../index')();
let assert = require('assert');

describe('test groupBy operator', () => {
  it('should have 2 groups', () => {
    let g = [1, 2, 3, 'a', 'b', 'c'].groupBy(i => Number.isInteger(i) ? 'Number' : 'Letter');
    assert.equal(Array.isArray(g), false);
    
    let r = g.toArray();
    assert(Array.isArray(r));
    assert.equal(r.length, 2);
    assert.deepEqual(r[0].value, [1, 2, 3]);
    assert.deepEqual(r[1].value, ['a', 'b', 'c']);
  });
});