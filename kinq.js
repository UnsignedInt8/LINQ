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
 * @param strict Strict mode: 1 is not equal to '1'
 * @return Return the average of a sequence.
 */
function average(strict) {
  return this.sum(strict) / this.count();
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
 * Alias of forEach
 */
function each(callback) {
  let i = 0;
  
  for (let item of this) {
    callback(item, i++);
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
 * Returns the first element in a sequence that satisfies a specified condition or throws an error if not found.
 * 
 * @param {(Function)} predicate The function called per iteraction till returns true.
 * @param defaultValue The default value.
 * @return The first element which satisfy condition or default value.
 */
function first(predicate) {
  predicate = typeof predicate === 'function' ? predicate : util.defaultPredicate;
  
  let error = new Error('No element satisfies the condition in predicate.');
  let firstElement = firstOrDefault.apply(this, [predicate, error]);
  if (firstElement === error) throw error;
  
  return firstElement;
}

/**
 * Returns the first element of the sequence that satisfies a condition or a default value if no such element is found.
 * 
 * @param {(Function)} predicate The function called per iteraction till returns true.
 * @param defaultValue The default value.
 */
function firstOrDefault(predicate, defaultValue) {
  predicate = typeof predicate === 'function' ? predicate : util.defaultPredicate;

  for (let item of this) {
    if (predicate(item)) return item;
  }
  
  return defaultValue;
}

/**
 * 
 */
function* flatten(deep) {
  deep = typeof deep === 'boolean' ? deep : true;
  for (let item of selectMany_deep.apply(this, [i => i, deep])) {
    yield item;
  }
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
  
  for (let item of this.distinct(equalityComparer)) {
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
 * Returns the maximum value in a sequence.
 * 
 * @param keySelector A transform function to apply to each element.
 * @param comparer A comparer function to check with item is greater.
 * @return The maximum value in the sequence.
 * keySelector: (T) -> key
 * comparer: (item1, item2) -> -1|0|1
 */
function max(keySelector, comparer) {
  comparer = typeof comparer === 'function' ? comparer : util.defaultComparer;
  
  let seq;
  let maximum;
  
  if (typeof keySelector === 'function') {
    seq = this.select(keySelector);
    maximum = keySelector(linq(seq).firstOrDefault()); // The first element should pick from self
  } else {
    seq = this;
    maximum = linq(seq).firstOrDefault();
  }
  
  for (let item of seq) {
    maximum = comparer(item, maximum) > 0 ? item : maximum;
  }
  
  return maximum;
}

/**
 * Returns the minimum value in a sequence.
 * 
 * @param keySelector A transform function to apply to each element.
 * @param comparer A comparer function to check with item is less.
 * @return The minimum value in the sequence.
 */
function min(keySelector, comparer) {
  comparer = typeof comparer === 'function' ? comparer : util.defaultComparer;
  
  let seq;
  let minimum;
  
  if (typeof keySelector === 'function') {
    seq = this.select(keySelector);
    minimum = keySelector(seq.firstOrDefault());
  } else {
    seq = this;
    minimum = linq(seq).firstOrDefault();
  }
  
  for (let item of seq) {
    minimum = comparer(item, minimum) < 0 ? item : minimum;
  }
  
  return minimum;
}

/**
 * Filters the elements of an sequence based on a specified type.
 * 
 * @param type A string to specify which type to return.
 * @return Filtered the elements of the sequence on.
 */
function* ofType(type) {
  // let builtinTypes = ['number', 'string', 'object', 'boolean', 'undefined', 'symbol'];
  if (typeof type === 'string') type = type.toLowerCase();
  
  let check = (instance) => {
    if (instance === null || instance === undefined) return false;
    let primitiveType = typeof instance;
    
    if (primitiveType === 'object' && typeof type === 'function') {
      return instance instanceof type;
    }
    
    return primitiveType === type;
  };
  
  for (let item of this.where(i => check(i)))  {
    yield item;
  }
}

let sort = (list, keySelector, comparer) => {
  comparer = typeof comparer === 'function' ? comparer : util.defaultComparer; 
  let sortedList = list.sort((i1, i2) => comparer(keySelector ? keySelector(i1) : i1, keySelector ? keySelector(i2) : i2));;
  
  return sortedList;
};

/**
 * Sorts the elements of a sequence in ascending order by using a specified comparer.
 * 
 * @param keySelector A function to extract a key from an element.
 * @param comparer An comparer to compare keys.
 * @return A sequence whose elements are sorted according to a key.
 */
function* orderBy(keySelector, comparer) {
  for (let item of sort(this.toList(), keySelector, comparer)) {
    yield item;
  }
}

/**
 * Sorts the elements of a sequence in descending order by using a specified comparer.
 * 
 * @param keySelector A function to extract a key from an element.
 * @param comparer An comparer to compare keys.
 * @return A sequence whose elements are sorted in descending order according to a key.
 */
function* orderByDescending(keySelector, comparer) {
  for (let item of sort(this.toList(), keySelector, comparer).reversed()) {
    yield item;
  }
}

/**
 * Inverts the order of the elements in a sequence.
 * 
 * @return A sequence whose elements correspond to those of the input sequence in reverse order.
 */
function* reversed() {
  let list = this.toList();
  
  for (let i = list.length - 1; i >= 0; i--) {
    yield list[i];
  }
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
 * Projects each element of a sequence to an IEnumerable<T>, flattens the resulting sequences into one sequence, and invokes a result selector function on each element therein. The index of each source element is used in the intermediate projected form of that element.
 * 
 * @param selector A transform function to apply to each source element; the second parameter of the function represents the index of the source element.
 * selector: (item, index) -> value
 */
function* selectMany(selector) {
  for (let item of selectMany_deep.apply(this, [selector, false])) {
    yield item;
  }
}

function* selectMany_deep(selector, deep) {
  selector = typeof selector === 'function' ? selector : util.defaultSelector;
  deep = typeof deep === 'boolean' ? deep : false;
  
  let makeSimple = function* (item) {
    let iterator = item[Symbol.iterator];
    if (!iterator) {
      return yield item;
    }
    
    if (deep && linq(item[Symbol.iterator]()).count() === 1) {
      let only = linq(item).single();
      if (only === item) {
        return yield only;
      }
      
      for (let i of makeSimple(only)) {
        yield i;
      }
      
      return;
    }
            
    for (let x of item) {
      if (deep) {
        for (let d of makeSimple(x)) {
          yield d;
        }
      } else { 
        yield x;
      }
    } 
  }
  
  let i = 0;
  
  for (let item of this) {
    let result = selector(item, i++);
    for (let sub of makeSimple(result)) {
      yield sub;
    }
  }
}

/**
 * Determines whether two sequences are equal by comparing the elements by using the default equality comparer for their type.
 * 
 * @param otherSequence A sequence to compare to the first sequence.
 * @return true if the two source sequences are of equal length and their corresponding elements are equal according to the equality comparer for their type; otherwise, false.
 */
function sequenceEqual(otherSequence, equalityComparer) {
  equalityComparer = typeof equalityComparer === 'function' ? equalityComparer : util.defaultEqualityComparer;
  let selfIterator = this[Symbol.iterator] ? this[Symbol.iterator]() : undefined;
  let otherIterator = otherSequence[Symbol.iterator] ? otherSequence[Symbol.iterator]() : undefined;
  
  if (linq([selfIterator, otherIterator]).any(i => i === undefined)) return false;
  
  let selfItem;
  let otherItem;
  
  do {
    selfItem = selfIterator.next();
    otherItem = otherIterator.next();
    
    if (!equalityComparer(selfItem.value, otherItem.value)) return false;  
  }while(!selfItem.done);
  
  return selfItem.done === otherItem.done;
}

/**
 * Returns the only element of a sequence that satisfies a specified condition or a default value if no such element exists; this method throws an exception if more than one element satisfies the condition or sequence is empty.
 * 
 * @param predicate A function to test an element for a condition.
 * @param defaultValue The default value if no such element exists.
 * @return The single element of the input sequence that satisfies a condition.
 */
function single(predicate, defaultValue) {
  predicate = typeof predicate === 'function' ? predicate : util.defaultPredicate;
  
  let count = 0;
  let singleItem = undefined;
  for (let item of this) {
    if (predicate(item)) {
      if (singleItem === undefined) {
        singleItem = item;
      } else {
        throw new Error('More than one element satisfies the condition in predicate.');
      }
    }
    
    count++;
  }
  
  if (singleItem === undefined && defaultValue !== undefined) return defaultValue;
  
  if (count === 0) throw new Error('The source sequence is empty.');
  if (!singleItem) throw new Error('No element satisfies the condition in predicate.');
  
  return singleItem;
}

/**
 * Alias of single
 */
function singleOrDefault(predicate, defaultValue) {
  return single.apply(this, [predicate, defaultValue]);  
}

/**
 * Bypasses a specified number of elements in a sequence and then returns the remaining elements.
 * 
 * @param count The number of elements to skip before returning the remaining elements.
 * @return A sequence that contains the elements that occur after the specified index in the input sequence.
 */
function* skip(count) {
  let skipped = 0;
  
  for (let item of this) {
    if (skipped++ < count) continue; 
    yield item;
  }
}

/**
 * Bypasses elements in a sequence as long as a specified condition is true and then returns the remaining elements. The element's index is used in the logic of the predicate function.
 * 
 * @param predicate A function to test each source element for a condition; the second parameter of the function represents the index of the source element.
 * @return A sequence that contains the elements from the input sequence starting at the first element in the linear series that does not pass the test specified by predicate.
 */
function* skipWhile(predicate) {
  let satisfied = false;
  let index = 0;
  
  for (let item of this) {
    if (!satisfied && predicate(item, index++)) continue;
    
    satisfied = true;
    yield item;
  }
}

/**
 * Computes the sum of a sequence.
 * 
 * @param transform The transform function called per interaction.
 * @return The sum of the values in the sequence.
 */
function sum(transform) {
  let sum = 0;
  let seq = typeof transform === 'function' ? this.select(transform) : this;
  
  for (let item of seq) {
    sum += Number.parseFloat(item);
  }
  
  return sum;
}

/**
 * Returns a specified number of contiguous elements from the start of a sequence.
 * 
 * @param count The number of elements to return.
 * @return A sequence that contains the specified number of elements from the start of the input sequence.
 */
function* take(count) {
  let taken = 0;
  
  for (let item of this) {
    if (taken++ >= count) break;
    yield item;
  }
}

/**
 * Returns elements from a sequence as long as a specified condition is true. The element's index is used in the logic of the predicate function.
 * 
 * @param predicate A function to test each source element for a condition; the second parameter of the function represents the index of the source element.
 * @return A sequence that contains elements from the input sequence that occur before the element at which the test no longer passes.
 */
function* takeWhile(predicate) {
  predicate = typeof predicate === 'function' ? predicate : util.defaultPredicate;
  let index = 0;
  
  for (let item of this) {
    if (predicate(item, index++)) {
      yield item;
    } else {
      break;
    }
  }
}

/**
 * Alias of orderBy
 */
function* thenBy(keySelector, comparer) {
  for (let item of orderBy.apply(this, [keySelector, comparer])) {
    yield item;
  }  
}

/**
 * Alias of orderByDescending
 */
function* thenByDescending(keySelector, comparer) {
  for (let item of orderByDescending.apply(this, [keySelector, comparer])) {
    yield item;
  }
}

/**
 * Creates an array
 * 
 * @return An array that contains the elements from the input sequence.
 */
function toArray() {
  return this instanceof Array ? this : Array.from(this);
}

/**
 * Alias of toArray
 */
function toList() {
  return toArray.apply(this);
}

/**
 * Alias of toMap
 */
function toDictionary(keySelector, elementSelector) {
  return toMap.apply(this, [keySelector, elementSelector]);
}

/**
 * Creates a map from a sequenece according to a specified key selector function, a comparer, and an element selector function.
 * 
 * @param keySelector A function to extract a key from each element.
 * @param elementSelector A transform function to produce a result element value from each element.
 * @return A map that contains values from the input sequence.
 * keySelector: (item) -> key (Required)
 * elementSelector: (item) -> value (Optional)
 */
function toMap(keySelector, elementSelector) {
  elementSelector = typeof elementSelector === 'function' ? elementSelector : i => i;
  let map = new Map();
  
  for (let item of this) {
    let key = keySelector(item);
    let element = elementSelector(item);
    map.set(key, element);
  }
  
  return map;
}

/**
 * Produces the set union of two sequences by using a specified equalityComparer.
 * 
 * @param otherSequence A sequence whose distinct elements form the second set for the union.
 * @param equalityComparer The equality comparer to compare values.
 * @return A sequence that contains the elements from both input sequences, no duplicates.
 */
function* union(otherSequence, equalityComparer) {
  
  let distinctSeq = this.distinct(equalityComparer).toArray();
  
  for (let item of distinctSeq) {
    yield item;
  }
  
  for (let item of linq(otherSequence).distinct(equalityComparer).where(i => !distinctSeq.contains(i, equalityComparer))) {
    yield item;
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

/**
 * Applies a specified function to the corresponding elements of two sequences, producing a sequence of the results.
 * 
 * @param otherSequence The second sequence to merge.
 * @param resultSelector A function that specifies how to merge the elements from the two sequences.
 * @return A sequence that contains merged elements of two input sequences.
 * resultSelector: (item, otherItem) -> result
 */
function* zip(otherSequence, resultSelector) {
  resultSelector = typeof resultSelector === 'function' ? resultSelector : (i1, i2) => [i1, i2];
  
  let selfIterator = this[Symbol.iterator]();
  let otherIterator = otherSequence[Symbol.iterator]();
  
  let selfItem = selfIterator.next();
  let otherItem = otherIterator.next();
  
  while (!selfItem.done) {
    if (selfItem.value === undefined || otherItem.value === undefined) break;
    yield resultSelector(selfItem.value, otherItem.value);
    
    selfItem = selfIterator.next();
    otherItem = otherIterator.next();
  }
}

module.exports = function(options) {
  options = options || { safeMode: false };
  
  let iterableOperators = [
    concatenate, defaultIfEmpty, distinct, except, 
    flatten, groupBy, groupJoin, intersect, 
    joinWith, ofType, orderBy, orderByDescending, 
    reversed, select, selectMany, skip, skipWhile, 
    take, takeWhile, thenBy, thenByDescending, where,
    union, zip];
    
  let linqOperators = [
    aggregate, all, any, average, contains, 
    count, elementAt, each,
    first, firstOrDefault,
    last, max, min, sum, sequenceEqual, single,
    toArray, toList, toMap, toDictionary].concat(iterableOperators);
  
  let linqChain = {};
  linqOperators.forEach((item) => linqChain[item.name] = item);
  
  Object.assign(linq.prototype, linqChain);
  linqOperators.forEach((func) => Object.assign(func.prototype, linqChain));
  
  Array.prototype.linq = function() { return linq(this); };
  Object.assign(Array.prototype, linqChain);
  
}