'use strict'

require('../index')();
let assert = require('assert');

let m1 = new Map([['a', 1], ['aa', 2], ['cc', 0]]);
let min = m1.min(i => i[1]);
console.log(min);