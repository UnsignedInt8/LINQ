'use strict'

require('../index')();
let assert = require('assert');

describe('test aggregate(reduce) operator', () => {
  it('should be a reversed string', () => {
    let str = 'the quick brown fox jumps over the lazy dog';
    let words = str.split(' ');
    let reversed = words.aggregate((cur, next) => next + ' ' + cur);
    assert.equal(reversed, 'dog lazy the over jumps fox brown quick the');
  });
  
  it('has 3 arguments', () => {
    let str = 'the quick brown fox jumps over the lazy dog';
    let words = str.split(' ');
    let reversed = words.aggregate('', (cur, next) => next + ' ' + cur, (r) => r.toUpperCase());
    assert.equal(reversed, 'DOG LAZY THE OVER JUMPS FOX BROWN QUICK ');
  });
});