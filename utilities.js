'use strict'

const defaultEqualityComparer = function (item1, item2) {
  return item1 === item2;
};

const defaultPredicate = function(item) {
  return true;
}

class ComparableSet extends Set {
  
  constructor(equalityComparer) {
    super();
    this._equalityComparer = typeof equalityComparer === 'function' ? equalityComparer : defaultEqualityComparer;
  }
  
  has(item) {
    for (let v of super.values()) {
      if (this._equalityComparer(item, v)) return true;
    }
    
    return false;
  }
}

module.exports = { defaultEqualityComparer, defaultPredicate, ComparableSet };