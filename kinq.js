'use strict'

/**
 * 
 */
function* linq(iterable) {
  for (let item of iterable) {
    yield item;
  }
}

/**
 * where
 */
function* where(predicate) {
  for (let item of this) {
    if (predicate(item)) {
      yield item;
    }
  }
}

function* filter(predicate) {
  return this.where(predicate);
}

function* select(transform) {
  for (let item of this) {
    yield transform(item);
  }
}

function* map(transform) {
  return this.select(transform);
}

function toArray() {
  return Array.from(this);
}

function toList() {
  return Array.from(this);
}

module.exports = function() {
  
  let linqOperators = [where, select, toArray, toList];
  
  let linqChain = {};
  linqOperators.forEach((item) => linqChain[item.name] = item);
  
  Object.assign(linq.prototype, linqChain);
  linqOperators.forEach((func) => Object.assign(func.prototype, linqChain));
  
  Array.prototype.linq = function() { return linq(this); };
  Object.assign(Array.prototype, linqChain);
  
}