'use strict'

require('../index')();
let assert = require('assert');

describe('test ofType operator', () => {
  class MyType {
    
  }
  let myObj = new MyType();
  
  let arr = [1, 'a', '1', new function() {}, null, 2, 
    'zbc', Symbol.iterator, undefined, true, false, true,
    myObj, NaN];
  
  it('should be number', () => {
    let num = arr.ofType('number').toArray();
    assert(num.all(i => typeof i === 'number') && num.length === 3);
  });
  
  it('should be object', () => {
    let objs = arr.ofType('object').toArray();
    assert(objs.all(i => i instanceof Object));
  });
  
  it('should be boolean', () => {
    let bools = arr.ofType('boolean').toArray();
    assert(bools.length > 0 && bools.all(i => typeof i === 'boolean'));
  });
  
  it('should be MyType', () => {
    let mys = arr.ofType(MyType).toArray();
    assert(mys.length > 0 && mys[0] === myObj);
  });
  
  let arrayList = [[128], [], [], 3, 'x'];
  it('should be array list', () => {
    let x = arrayList.ofType(Array).toArray();
    assert(x.length === 3 && x[0][0] === 128);
  });
});