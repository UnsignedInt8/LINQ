'use strict'

const defaultEqualityComparer = function (item1, item2) {
  return item1 === item2;
};

const defaultComparer = function(item1, item2) {
  return item1 > item2 ? 1 : (item1 === item2 ? 0 : -1);
}

const defaultPredicate = function(item) {
  return true;
};

const defaultSelector = function(item) {
  return item;
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
  
  add(item) {
    if (this.has(item)) return;
    return super.add(item);
  }
}

module.exports = { defaultComparer, defaultEqualityComparer, defaultPredicate, defaultSelector, ComparableSet };