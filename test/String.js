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
  
  it('average', () => {
    assert(isNaN(s.average()));
  });
  
  it('concat', () => {
    assert.deepEqual(s.concatenate('mxmx').toArray(), Array.from(s + 'mxmx'));
  });
  
  it('contains', () => {
    assert(s.contains('N'));
    assert(!s.contains(0));
  });
  
  it('count', () => {
    assert(s.count() === s.length);
    assert(''.count() === ''.length);
  });
  
  it('defaultIfEmpty', () => {
    assert(s.defaultIfEmpty().count() === s.length);
    assert.deepEqual(''.defaultIfEmpty(0).toArray(), [0]);
  });
  
  it('distinct', () => {
    assert.deepEqual(s.distinct().toArray(), Array.from('Helo wrd,hLINQ!0'));
  });
  
  it('elementAt', () => {
    assert(s.elementAt(5) === ' ');
  });
  
  it('except', () => {
    assert.deepEqual(s.except('o').toArray(), Array.from('Hell wrld, hell LINQ! 0'));
  });
  
  it('first', () => {
    assert.strictEqual(s.first(), 'H');
    assert.strictEqual(s.first(i => i == 0), ' ');
  });
  
  it('single', () => {
    assert.strictEqual(s.single(i => i === '0'), '0');
    assert.throws(() => s.single(i => i == 'l'), Error);
  })
});