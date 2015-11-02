
'use strict'

require('../index')();
let assert = require('assert');

let numArray = [-10, 20, -5, 5, 8, Number.MAX_VALUE];

describe('test where operator', () => {
  it('should return filtered elements', () => {
    
    var fa = numArray.where(i => i > 0);
    fa = fa.toArray();
    assert.equal(fa.length, 4);
  });
  
  it('should equal', () => {
    var x = [1, , 2, 3, 4];
    let x2 = x.where(i => i > 2).toArray().select(i => i * 2).toList();
    assert.deepEqual(x2, [6, 8]);
  })
});