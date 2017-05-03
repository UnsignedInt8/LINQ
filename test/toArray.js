'use strict'

require('../index')();
let assert = require('assert');

describe('test toArray', () => {
    it('has toArray or not', () => {
        let m1 = new Map([[1, 'a'], [2, 'b'], [3, 'c']]);
        assert.deepEqual(Array.from(m1.keys()), [1, 2, 3]);
        assert.deepEqual(Array.from(m1.values()), ['a', 'b', 'c']);
    });
});