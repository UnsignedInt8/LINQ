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
  if (!predicate) {
    return any_withoutPredicate.apply(this);
  }
  
  for (let item of this) {
    if (predicate(item)) {
      return true;
    }
  }
  
  return false;
}

function any_withoutPredicate() {
  for (let item of this) {
    if (item) return true;
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
  if (typeof equalityComparer === 'function') {
    return contains_byEqualityComparer.apply(this, arguments);
  }
  
  for (let i of this) {
    if (item === i) return true;
  }
  
  return false;
}

function contains_byEqualityComparer(item, equalityComparer) {
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
  if (typeof predicate === 'function') {
    return count_byPredicate.apply(this, arguments);
  }
  
  let c = 0;
  
  for (let item of this) {
    c++;
  }
  
  return c;
}

function count_byPredicate(predicate) {
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
 * @return The element at a specified index 
 */
function elementAt(index) {
  let i = 0;
  
  for (let item of this) {
    if (i === index) return item;
    i++;
  }
}

/**
 * Returns the element at a specified index in a sequence or a default value if the index is out of range.
 * 
 * @param position see _.elementAt
 * @param defaultValue The default value if the index is out of range.
 * @return The element at a specified index or default value.
 */
function elementAtOrDefault(index, defaultValue) {
  let i = 0;
  
  for (let item of this) {
    if (i === index) return item;
    i++;
  }
  
  return defaultValue;
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
  
  let linqOperators = [all, any, average, concatenate, contains, count, 
    defaultIfEmpty, distinct, elementAt, elementAtOrDefault, 
    where, select, toArray, toList];
  
  let linqChain = {};
  linqOperators.forEach((item) => linqChain[item.name] = item);
  
  Object.assign(linq.prototype, linqChain);
  linqOperators.forEach((func) => Object.assign(func.prototype, linqChain));
  
  Array.prototype.linq = function() { return linq(this); };
  Object.assign(Array.prototype, linqChain);
  
}