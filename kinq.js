'use strict'

let util = require('./utilities');

/**
 * 
 */
function* linq(iterable) {
  for (let item of iterable) {
    yield item;
  }
}

/**
 * Applies an accumulator function over a sequence. The specified seed value is used as the initial accumulator value, and the specified function is used to select the result value.
 * 
 * @param seed The initial accumulator value.
 * @param transform An accumulator function to be invoked on each element.
 * @param resultTransform A function to transform the final accumulator value into the result value.
 * @return The transformed final accumulator value.
 * transform: (current, next) -> result
 */
function aggregate(transform) {
  switch (arguments.length) {
    case 1:
      return aggregate_seed_transform_selector.apply(this, [undefined, arguments[0]]);
    default:
      return aggregate_seed_transform_selector.apply(this, arguments);
  }
}

function aggregate_seed_transform_selector(seed, transform, resultTransform) {
  
  let it = this[Symbol.iterator]();
  let current = it.next();
  if (current.done) return current.value;
  let result = typeof seed === 'undefined' ? current.value : seed;
  
  let next = it.next();
  while(!next.done) {
    result = transform(result, next.value);
    next = it.next();
  }
  
  if (typeof resultTransform === 'function') {
    return resultTransform(result);
  }
  
  return result;
}

/**
 * Determines whether all elements of a sequence satisfy a condition.
 * 
 * @param {Function} predicate The function called per iteraction till returns false.
 * @return All elements satisfy a condition returns true, or returns false.
 * predicate: (T) -> Boolean
 */
function all(predicate) {
  for (let item of this) {
    if (!predicate(item)) {
      return false;
    }
  }
  
  return true;
}

/**
 * Determines whether a sequence contains any elements.
 * 
 * @param {(Function|optional)} predicate The function called per iteraction till returns true.
 * @return Any elements satisfy a condition returns true, or returns false.
 * predicate: (T) -> Boolean
 */
function any(predicate) {
  predicate = typeof predicate === 'function' ? predicate : util.defaultPredicate;
  
  for (let item of this) {
    if (predicate(item)) return true;
  }
  
  return false;
}

/**
 * Computes the average of a sequence. The elements of this sequence should be Number.
 * 
 * @return Return the average of a sequence.
 */
function average() {
  
}

/**
 * Concatenates two sequences.
 * 
 * @param otherSequence The other iterable sequence.
 * @return The iterator of concatenated sequence.
 */
function* concatenate(otherSequence) {
  for (let item of this) {
    yield item;
  }
  
  for (let otherItem of otherSequence) {
    yield otherItem;
  }
}

/**
 * Determines whether a sequence contains a specified element by using the default equality comparer.
 * 
 * @param item The item which you want to check.
 * @param {(Function|optional)} equalityComparer The equality comparer.
 * equalityComparer: (item1, item2) -> Boolean
 */
function contains(item, equalityComparer) {
  equalityComparer = typeof equalityComparer === 'function' ? equalityComparer : util.defaultEqualityComparer; 
  
  for (let i of this) {
    if (equalityComparer(i, item)) return true;
  }
  
  return false;
}

/**
 * Returns a number that represents how many elements in the specified sequence satisfy a condition.
 * 
 * @param {(Function|optional)} predicate The condition for compute item counts
 * @return Return the count which satisfy a condition.
 */
function count(predicate) {
  predicate = typeof predicate === 'function' ? predicate : util.defaultPredicate;
  
  let c = 0;
  
  for (let item of this) {
    if (predicate(item)) c++;
  }
  
  return c;
}

/**
 * Returns the elements of the specified sequence or the specified value in a singleton collection if the sequence is empty.
 * 
 * @param defaultValue The default value which you want to return.
 */
function* defaultIfEmpty(defaultValue) {
  let i = 0;
  
  for (let item of this) {
    yield item;
    i++;
  }
  
  if (i === 0) {
    yield defaultValue;
  }
}

/**
 * Returns distinct elements from a sequence by using a specified equalityComparer to compare values.
 * 
 * @param {(Function|optional)} equalityComparer The equality comparer
 * equalityComparer: (item1, item2) -> Boolean
 */
function* distinct(equalityComparer) {
  let exists = new Set();
  
  for (let item of this) {
    if (exists.has(item)) continue;
    exists.add(item);
    yield item;
  }
}

function* distinct_withEqualityComparer(equalityComparer) {
  // let exists = new Set();
  
  // let iterator = this[Symbol.iterator]();
  // let curValue = iterator.next();
  // let nextValue = iterator.next();
  
  // yield curValue.value;
  
  // while(!nextValue.done) {
  //   if (equalityComparer(curValue.value, nextValue.value)) {
  //     continue;
  //   }
    
  //   // yield
  // }
  throw new Error('Not implemented');
}

/**
 * Returns the element at a specified index in a sequence.
 * 
 * @param positon The zero-base index of element which you want.
 * @param defaultValue The default value if the index is out of range. 
 * @return The element at a specified index or default value
 */
function elementAt(index, defaultValue) {
  let i = 0;
  
  for (let item of this) {
    if (i === index) return item;
    i++;
  }
  
  return defaultValue;
}

/**
 * Returns an empty sequence.
 */
function empty() {
  return [];
}

/**
 * Produces the set difference of two sequences by using the default equality comparer to compare values.
 * 
 * @param otherSequence A sequence whose elements that also occur in the first sequence will cause those elements to be removed from the returned sequence.
 * @param {(Function|optional)} equalityComparer The equality comparer called per iteraction
 * @return A sequence that contains the set difference of the elements of two sequences.
 */
function* except(otherSequence, equalityComparer) {
  equalityComparer = typeof equalityComparer === 'function' ? equalityComparer : util.defaultEqualityComparer;
  
  for (let item of this) {
    let equal = false;
    
    for (let otherItem of otherSequence) {
      if (equalityComparer(item, otherItem)) {
        equal = true;
        break;
      } 
    }
    
    if (equal) continue;
    yield item;
  }
}

/**
 * Returns the first element in a sequence that satisfies a specified condition.
 * 
 * @param {(Function|optional)} predicate The function called per iteraction till returns true.
 * @param defaultValue The optional default value.
 * @return The first element which satisfy condition or default value.
 */
function first(predicate, defaultValue) {
  predicate = typeof predicate === 'function' ? predicate : util.defaultPredicate;
  
  for (let item of this) {
    if (predicate(item)) return item;
  }
  
  return defaultValue;
}

function* groupBy() {
  
}

/**
 * Projects each element of a sequence into a new form.
 * 
 * @param {Function} transform The transform function called per interaction.
 * 
 * transform: (T, index) -> any
 */
function* select(transform) {
  let i = 0;
  
  for (let item of this) {
    yield transform(item, i);
    i++;
  }
}

/**
 * Filters a sequence of values based on a predicate.
 * 
 * @param {Function} predicate The filter function called per iteraction.
 * @return iterator
 * predicate: (T, index) -> Boolean
 */
function* where(predicate) {
  let i = 0;
  
  for (let item of this) {
    if (predicate(item, i)) {
      yield item;
    }
    
    i++;
  }
}

function toArray() {
  return Array.from(this);
}

function toList() {
  return Array.from(this);
}

module.exports = function(options) {
  options = options || { safeMode: false };
  
  let linqOperators = [aggregate, all, any, average, concatenate, contains, 
    count, defaultIfEmpty, distinct, elementAt, except,
    first, 
    where, select, toArray, toList];
  
  let linqChain = {};
  linqOperators.forEach((item) => linqChain[item.name] = item);
  
  Object.assign(linq.prototype, linqChain);
  linqOperators.forEach((func) => Object.assign(func.prototype, linqChain));
  
  Array.prototype.linq = function() { return linq(this); };
  Object.assign(Array.prototype, linqChain);
  
}