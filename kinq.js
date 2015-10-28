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
 * @param {(Function)} predicate The function called per iteraction till returns true.
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
 * @param {(Function)} equalityComparer The equality comparer.
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
 * @param {(Function)} predicate The condition for compute item counts
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
 * @param {(Function)} equalityComparer The equality comparer
 * equalityComparer: (item1, item2) -> Boolean
 */
function* distinct(equalityComparer) {
  let exists = typeof equalityComparer === 'function' ? new util.ComparableSet(equalityComparer) : new Set();
  equalityComparer = typeof equalityComparer === 'function' ? equalityComparer : util.defaultEqualityComparer;
  
  for (let item of this) {
    if (exists.has(item)) continue;
    exists.add(item);
    yield item;
  }
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
 * @param {(Function)} equalityComparer The equality comparer called per iteraction
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
 * @param {(Function)} predicate The function called per iteraction till returns true.
 * @param defaultValue The default value.
 * @return The first element which satisfy condition or default value.
 */
function first(predicate, defaultValue) {
  predicate = typeof predicate === 'function' ? predicate : util.defaultPredicate;
  
  for (let item of this) {
    if (predicate(item)) return item;
  }
  
  return defaultValue;
}

/**
 * Groups the elements of a sequence according to a specified key selector function and projects the elements for each group by using a specified function.
 * 
 * @param keySelector A function to extract the key for each element. (Required)
 * @param elementSelector A function to map each source element to an element. (Optional)
 * @param resultTransform A function to create a result value from each group. (Optional)
 * @return Returns iterable grouped items. Each item is { key: key, value: [items] }
 */
function* groupBy(keySelector, elementSelector, resultTransform) {
  
  let group = () => {
    let map = new Map();
  
    for (let item of this) {
      let key = keySelector(item);
      let el = elementSelector ? elementSelector(item) : item;
      
      let list = map.get(key);
      if (list) {
        list.push(el);
      } else {
        map.set(key, [el]);
      }
    }
    
    return map;  
  }
  
  for (let kv of group()) {
    let groupItem =  { key: kv[0], value: kv[1] };
    groupItem = typeof resultTransform === 'function' ? resultTransform(groupItem) : groupItem;
    yield groupItem;
  }
}

/**
 * Correlates the elements of two sequences based on equality of keys and groups the results. The default equality comparer is used to compare keys.
 * 
 * @param inner The sequence to join to the first sequence.
 * @param outerKeySelector A function to extract the join key from each element of the first sequence.
 * @param innerKeySelector A function to extract the join key from each element of the second sequence.
 * @param resultSelector A function to create a result element from an element from the first sequence and a collection of matching elements from the second sequence.
 * @return A sequence that contains elements of type result that are obtained by performing a grouped join on two sequences.
 * outerKeySelector: (outerItem) -> key
 * innerKeySelector: (innerItem) -> key
 * resultSelector: (outerItem, [groupedInnerItem]) -> result
 */
function* groupJoin(inner, outerKeySelector, innerKeySelector, resultSelector) {
  
  let group = (iterable, keySelector) => {
    let map = new Map();
    
    for (let item of iterable) {
      let key = keySelector(item);
      let list = map.get(key);
      if (list) {
        list.push(item);
      } else {
        map.set(key, [item]);
      }
    }
    
    return map;
  }
  
  for (let outerGroupItem of group(this, outerKeySelector)) {
    let outerKey = outerGroupItem[0];
    let outerItems = outerGroupItem[1];
    
    let innerGroups = group(inner, innerKeySelector);
    let innerItems = innerGroups.get(outerKey);
    
    if (!innerItems) continue;
    
    for (let outerItem of outerItems) {
      let result = resultSelector(outerItem, innerItems);
      yield result;
    }
  }
}

/**
 * Produces the set intersection of two sequences by using the specified equalityComparer to compare values.
 * 
 * @param otherSequence A sequence whose distinct elements that also appear in the first sequence will be returned.
 * @param eqaulityComparer An equalityComparer to compare values.
 * @return A sequence that contains the elements that form the set intersection of two sequences.
 */
function* intersect(otherSequence, equalityComparer) {
  equalityComparer = typeof equalityComparer === 'function' ? equalityComparer : util.defaultEqualityComparer;
  
  for (let item of this.distinct()) {
    for (let otherItem of otherSequence) {
      if (equalityComparer(item, otherItem)) {
        yield item;
        break;
      }
    }
  }
}

/**
 * Correlates the elements of two sequences based on matching keys. A specified equalityComparer is used to compare keys.
 * 
 * @param join The sequence to join to the first sequence.
 * @param outerKeySelector A function to extract the join key from each element of the first sequence.
 * @param innerKeySelector A function to extract the join key from each element of the second sequence.
 * @param resultSelector A function to create a result element from two matching elements.
 * @param keyEqualityComparer An comparer compare keys.
 * 
 * outerKeySelector: (outerItem) -> key
 * innerKeySelector: (innerItem) -> key
 * resultSelector: (outerItem, innerItem) -> result
 * keyEqualityComparer: (item1, item2) -> Boolean
 */
function* joinWith(inner, outerKeySelector, innerKeySelector, resultSelector, keyEqualityComparer) {
  keyEqualityComparer = typeof keyEqualityComparer === 'function' ? keyEqualityComparer : util.defaultEqualityComparer;
  
  for (let outerItem of this) {
    let outerKey = outerKeySelector(outerItem);
    
    for(let innerItem of inner) {
      let innerKey = innerKeySelector(innerItem);
      
      if (keyEqualityComparer(outerKey, innerKey)) {
        yield resultSelector(outerItem, innerItem);
      }
    }
  }
}

/**
 * Returns the last element of a sequence that satisfies a condition or a default value if no such element is found.
 * 
 * @param predicate A function to test each element for a condition.
 * @param defaultValue The default value if no such element is found.
 * @return Default value if the sequence is empty or if no elements pass the test in the predicate function; otherwise, the last element that passes the test in the predicate function.
 */
function last(predicate, defaultValue) {
  predicate = typeof predicate === 'function' ? predicate : util.defaultPredicate;
   
  let lastValue;
  let found = false;
  for (let item of this.where(predicate)) {
    lastValue = item;
    found = true;
  }
  
  return found ? lastValue : defaultValue;
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
    first, groupBy, groupJoin, intersect, joinWith,
    last, 
    where, select, toArray, toList];
  
  let linqChain = {};
  linqOperators.forEach((item) => linqChain[item.name] = item);
  
  Object.assign(linq.prototype, linqChain);
  linqOperators.forEach((func) => Object.assign(func.prototype, linqChain));
  
  Array.prototype.linq = function() { return linq(this); };
  Object.assign(Array.prototype, linqChain);
  
}