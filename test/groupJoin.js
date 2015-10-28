'use strict'

require('../index')();
let assert = require('assert');

describe('test groupJoin operator', () => {
  it('should be joined', () => {
    let magnus = { Name: "Hedlund, Magnus" };
    let terry = { Name: "Adams, Terry" };
    let charlotte = { Name: "Weiss, Charlotte" };

    let barley = { Name: "Barley", Owner: terry };
    let boots = { Name: "Boots", Owner: terry };
    let whiskers = { Name: "Whiskers", Owner: charlotte };
    let daisy = { Name: "Daisy", Owner: magnus };
    
    let people = [magnus, terry, charlotte];
    let pets = [barley, boots, whiskers, daisy];
    
    let peopleWithPets = people.groupJoin(pets, person => person, pet => pet.Owner, (person, petCollection) => {
      return {  
        owner: person.Name,
        pets: petCollection.select(pet => pet.Name).toArray()
      }
    }).toArray();
    
    assert.deepEqual(peopleWithPets[0], { owner: magnus.Name, pets: [daisy.Name] });
    assert.deepEqual(peopleWithPets[1], { owner: terry.Name, pets: [barley.Name, boots.Name] });
    assert.deepEqual(peopleWithPets[2], { owner: charlotte.Name, pets: [whiskers.Name] });
  });
});