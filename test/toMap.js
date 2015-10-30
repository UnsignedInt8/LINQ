'use strict'

require('../index')();
let assert = require('assert');

describe('test toMap operator', () => {
  let coms = [
    { Company: "Coho Vineyard", Weight: 25.2, TrackingNumber: 89453312 },
    { Company: "Lucerne Publishing", Weight: 18.7, TrackingNumber: 89112755 },
    { Company: "Wingtip Toys", Weight: 6.0, TrackingNumber: 299456122 },
    { Company: "Adventure Works", Weight: 33.8, TrackingNumber: 4665518773 } ] 
              
  it('should be a map', () => {
    let map = coms.toMap(c => c.TrackingNumber, p => p.Company + " " + p.TrackingNumber);
    assert.deepEqual(Array.from(map.keys()), [89453312, 89112755, 299456122, 4665518773]);
  });
});