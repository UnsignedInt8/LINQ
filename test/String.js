'use strict'

require('../index')();
let assert = require('assert');

describe('test String linqable', () => {
  let s = 'Hello world, hello LINQ! 0';
  let ss = 'ss';
  
  it('all', () => {
    assert.strictEqual(s.all(i => i), true);
    assert.strictEqual(ss.all(i => i === 's'), true);
    assert.strictEqual(''.all(i => i), true);
  });
  
  it('any', () => {
    assert.strictEqual(s.any(), true);
    assert.strictEqual(s.any(i => i === '0'), true);
    assert.strictEqual(''.any(), false);
  });
  
  it('aggregate', () => {
    assert.strictEqual(s.aggregate((c, n) => c + n), s);
    assert.strictEqual(s.aggregate('xx', (c, n) => c + n), 'xx' + s);
  });
});