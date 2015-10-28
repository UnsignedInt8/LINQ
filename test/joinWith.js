'use strict'

require('../index')();
let assert = require('assert');

describe('test joinWith operator', () => {
  it('', () => {
    let magnus = { Name: "Hedlund, Magnus" };
    let terry = { Name: "Adams, Terry" };
    let charlotte = { Name: "Weiss, Charlotte" };

    let barley = { Name: "Barley", Owner: terry };
    let boots = { Name: "Boots", Owner: terry };
    let whiskers = { Name: "Whiskers", Owner: charlotte };
    let daisy = { Name: "Daisy", Owner: magnus };
    
    let people = [magnus, terry, charlotte];
    let pets = [barley, boots, whiskers, daisy];
    
    let peopleWithPets = people.joinWith(pets, person => person, pet => pet.Owner, (person, pet) => { return { OwnerName: person.Name, Pet: pet.Name }}).toArray();
    
    assert.equal(peopleWithPets.length, 4);
  });
});