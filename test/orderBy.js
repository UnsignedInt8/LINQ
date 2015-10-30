'use strict'

require('../index')();
let assert = require('assert');

describe('test orderBy operator', () => {
  let unorderedlist = [1, Infinity, -8, 3, -0, +0, (-Infinity)];
  
  it('should be ordered list', () => {
    let list = unorderedlist.orderBy(i => i).toList();
    assert(list[0] === -Infinity);
    assert.deepEqual(list, unorderedlist.orderBy().toList());
  });
  
  it('should be reversed list', () => {
    let bottomup = unorderedlist.orderByDescending().toList();
    assert(bottomup[0] === Infinity);
  });
  
  it('should be equal', () => {
    let arr = [5, 1, 2, 3];
    assert.deepEqual(arr.orderBy().toList(), arr.orderByDescending().reversed().toList());
  })
  
  let magnus = { Name: "Hedlund, Magnus" };
  let terry = { Name: "Adams, Terry" };
  let charlotte = { Name: "Weiss, Charlotte" };

  let barley = { Name: "Barley", Owner: terry };
  let boots = { Name: "Boots", Owner: terry };
  let whiskers = { Name: "Whiskers", Owner: charlotte };
  let daisy = { Name: "Daisy", Owner: magnus };
  
  let people = [magnus, terry, charlotte];
  let pets = [whiskers, daisy, barley, boots ];
  
  it('has custom key selector', () => {
    let orderPets = pets.orderBy(p => p.Name).toList();
    assert(orderPets.length === 4 && orderPets[0].Name === barley.Name);
  });
  
  it('oreder by descending', () => {
    let orderPets = pets.orderByDescending(p => p.Name).toList();
    assert(orderPets.length === 4 && orderPets[0].Name === whiskers.Name);
  });
  
  it('sorted by descending', () => {
    let desc = [1, 2, 4, -Infinity].orderByDescending().toList();
    assert(desc[0] === 4);
  });
  
  let orderedNums = [-Infinity, -8, -2, 0, 1, 2, 8];
  it('then by', () => {
    let ori = orderedNums.orderBy().thenByDescending().thenBy().toArray();
    assert.deepEqual(orderedNums, ori);
  });
});