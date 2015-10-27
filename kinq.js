'use strict'

function* linq(iterable) {
  for (let item of iterable) {
    yield item;
  }
}

function* where(predicate) {
  for (let item of this) {
    if (predicate(item)) {
      yield item;
    }
  }
}

function* select(transform) {
  for (let item of this) {
    yield transform(item);
  }
}

function* toArray() {
  return Array.from(this);
}

function* toList() {
  return this.toArray();
}

module.exports = function() {
  let iterableOperators = [where, select];
  let linqOperators = [toArray, toList].concat(iterableOperators);
  
  let linqChain = {};
  linqOperators.forEach((item) => linqChain[item.name] = item);
  
  Object.assign(linq.prototype, linqChain);
  iterableOperators.forEach((func) => Object.assign(func.prototype, linqChain));
}