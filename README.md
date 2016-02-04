# KINQ

**KINQ is LINQ for Node.js bases on ES6.**

[![Build Status](https://travis-ci.org/UnsignedInt8/Kinq.svg?branch=master)](https://travis-ci.org/UnsignedInt8/Kinq)

What's LINQ?
------------

> Language-Integrated Query (LINQ) is a set of features that extends
> powerful query capabilities to the language syntax of C# and Visual
> Basic. LINQ introduces standard, easily-learned patterns for querying
> and updating data, and the technology can be extended to support
> potentially any kind of data store.

Now, LINQ is also available on Node.js(>=4.0) which named **KINQ**!

KINQ Operators
--------------

 - Linqable Operators

Operator | Description
---- | ---------
concatenate|Concatenats two sequences.
defaultIfEmpty|Returns the elements of the specified sequence or the specified value in a singleton collection if the sequence is empty.
distinct|Returns distinct elements from a sequence by using the closure function to compare values.
except|Produces the set difference of two sequences by using the  equality comparer to compare values.
***flatten***|Flattens a nested sequence (the nesting can be to any depth).
groupBy|Groups the elements of a sequence according to a specified key selector function.
intersect|Produces the set intersection of two sequences by using the default equality comparer to compare values.
joinWith|Correlates the elements of two sequences based on matching keys.
orderBy|Sorts the elements of a sequence in ascending order according to a key.
orderByDescending|Sorts the elements of a sequence in descending order according to a key.
reversed|Inverts the order of the elements in a sequence.
select|Projects each element of a sequence into a new form.
selectMany|Projects each element of a sequence to an Iterable<T> and flattens the resulting sequences into one sequence.
skip|Bypasses a specified number of elements in a sequence and then returns the remaining elements.
skipWhile|Bypasses elements in a sequence as long as a specified condition is true and then returns the remaining elements.
take|Returns a specified number of contiguous elements from the start of a sequence.
takeWhile|Returns elements from a sequence as long as a specified condition is true.
thenBy|Performs a subsequent ordering of the elements in a sequence in ascending order according to a key.
thenByDescending|Performs a subsequent ordering of the elements in a sequence in descending order, according to a key.
union|Produces the set union of two sequences by using the default equality comparer.
where|Filters a sequence of values based on a predicate.
zip|Applies a specified function to the corresponding elements of two sequences, producing a sequence of the results.

 - Immediate Evaluation Operators
 
Operator | Description
---- | ---------
aggregate|Applies an accumulator function over a sequence.
all|Determines whether all elements of a sequence satisfy a condition.
any|Determines whether a sequence contains any elements.
average|Computes the average of a sequence of IntegerType/Float/Double values that are obtained by invoking a transform function on each element of the input sequence.
contains|Determines whether a sequence contains a specified element by using the default equality comparer.
count|Returns the number of elements in a sequence.
***each***|Invoke closure function for each element.
elementAt|Returns the element at a specified index in a sequence.
first|Returns the first element in a sequence that satisfies a specified condition or default first element.
firstOrDefault|Returns the first element of a sequence, or a default value if the sequence contains no elements.
last|Returns the last element of a sequence or specified condition.
max|Invokes a transform function on each element of a sequence and returns the maximum element.
min|Invokes a transform function on each element of a sequence and returns the minimum element.
sequenceEqual|Determines whether two sequences are equal by comparing the elements by using equality comparer for their type.
single|Returns the only element of a sequence, and return nil if there is not exactly one element in the sequence.
singleOrDefault|Returns the only element of a sequence, or a default value if the sequence is empty; this method throws an exception if there is more than one element in the sequence.
sum|Computes the sum of a sequence by using closure function to get value of each element.
toArray|Creates an array from base sequence.
toList|Alias of toArray.
toDictionary|Alias of toDictionary.
toMap|Creates a Map from an sequence according to a specified key selector function.

How to use?
-----------

There are **linqable operators** and **immediate evaluation operators** in KINQ. Linqable operators are not going to evaluate the result what you wish till meets an immediate evaluation operator. So, it's also called **lazy evaluation**. Linqable operators can be chained, so you can combine multi-operators to execute complex query.

All code below written by ES6.

----------

**Install KINQ**

```
npm install kinq --save
```

```
const KINQ = require('kinq');

// To enable KINQ, call it as function. KINQ is going to make Array, Map, Set, Buffer, String...... linqable.
KINQ();

// By using toLinqable function to transform an iterable object to linqable.
KINQ.toLinqable(iterableObj);
```

**aggregate**

Applies an accumulator function over a sequence. The specified seed value is used as the initial accumulator value. In other languages, it may be called *reduce*.

*Syntax*

    aggreagte(func: (current: T, next: T) => T) => T

    aggregate(seed: T, func: (seed: T, start: T) => T) => T

    aggregate(seed: T, func: (seed: T, start: T) => T, resultSelector: (result: T) => TResult) => TResult

*Usage*

```
let a1 = [1].aggregate((cur, next) => cur + next);
// a1 => 1

let str = 'the quick brown fox jumps over the lazy dog';
let words = str.split(' ');
let reversed = words.aggregate((cur, next) => next + ' ' + cur);
// reversed => 'dog lazy the over jumps fox brown quick the'

let str = 'the quick brown fox jumps over the lazy dog';
let words = str.split(' ');
let upperReversed = words.aggregate('', (cur, next) => next + ' ' + cur, (r) => r.toUpperCase());
// upperReversed => 'DOG LAZY THE OVER JUMPS FOX BROWN QUICK THE '
```

**all**

Determines whether all elements of a sequence satisfy a condition. In other languages, it may be called *every*.

*Syntax*

    all((item: T) => boolean) => boolean

*Usage*

```
let r = ['1', '2', '2', '4'].all(i => i.length > 0);
// r => true

let r = [1, 2, 3, '3', 4, '5'].all(i => Number.isInteger(i));
// r => false

let r = [].all(i => i);
// r => true
```

**any**

Determines whether a sequence contains any elements. In other languages, it may be called *some*.

*Syntax*

    any() => boolean
    any((item: T) => boolean) => boolean

*Usage*

```
let r = [1, 0, 0, 'x'].any((i) => i === 'x');
// r => true

let r = [''].any();
// r => true

let r = [].any();
// r => false
```

**average**

Computes the average of a sequence.

*Syntax*

    average() => number
    average((item: T) => TResult) => number

*Usage*

```
let num = ['30', 0, 60.0, 20, '40'].average();
// num => 30

let num = ['30', '0', 60.0, 20, '40'].average(i => typeof i === 'number' ? i : 0);
// num => 16

let a = ['x', '', null, undefined, 2, 4].average();
// a => NaN

let a = [Number.MAX_VALUE, Number.MAX_VALUE, -Number.MAX_VALUE].average();
// a => Infinity
```

**concatenate**

Concatenates two sequences.

*Syntax*

    concatenate(otherSequence: Iterable<T>) => _Linqable<T>

*Usage*

```
let a1 = [1, 2, 3];
let a2 = ['a', 'b', 'c'];
    
let a = a1.concatenate(a2).toArray();
// a => [1, 2, 3, 'a', 'b', 'c']
```

**contains**

Determines whether a sequence contains a specified element by using the default/specified equality comparer.

*Syntax*

    contains(item: any) => boolean
    contains(item: any, equalityComparer(item1, item2) => boolean) => boolean

*Usage*

```
let a = ['', '23', 'xx'].contains('');
// a => true

let anArray = [1, '2', 3];
let r = anArray.contains(2, (item1, item2) => item1 == item2);
// r => true

let r2 = anArray.contains(2);
// r => false
```

**count**

Returns the number of elements in a sequence.

*Syntax*

    count() => number
    count((item) => boolean) => number

*Usage*

```
let c = [1, 1, 1, 1, 1].count();
// c => 5

let c = [null, '', 1, [], true].count(i => false);
// c => 0
```

**defaultIfEmpty**

Returns the elements of the specified sequence or the type parameter's default value in a singleton collection if the sequence is empty.

*Syntax*

    defaultIfEmpty() => _Linqable<T>
    defaultIfEmpty(defaultValue) => _Linqable<T>

*Usage*

```
let arr = [1, 2, 3];
let x = arr.defaultIfEmpty('').toArray();
// x => [1, 2, 3]

let x = [].defaultIfEmpty('0').toArray();
// x => ['0']

let x = [].defaultIfEmpty().toArray();
// x = > [undefined]
```

**distinct**

Returns distinct elements from a sequence by using the default/specified equality comparer to compare values.

*Syntax*

    distinct() => _Liqnable<T>
    distinct(eqaulityComparer(item1, item2) => boolean) => _Linqable<T>

*Usage*

```
let obj = new Object();
let arr = [1, 2, 2, 3, 2, 1, 9, '1', 'x', 'y', 'x', 'a', obj, obj, 'z'].distinct().toArray();
// arr => [1, 2, 3, 9, '1', 'x', 'y', 'a', obj, 'z']

let arr = [1, 2, 2, 3, 2, 1, 9, '1', 'x', 'y', 'x', 'a', obj, obj, 'z'].distinct((item1, item2) => item1 == item2).toArray();
// arr => [1, 2, 3, 9, 'x', 'y', 'a', obj, 'z']
```

**each**

Invoke closure function for each element.

*Syntax*

    each((item: T) => void) => void

*Usage*

```
[1, 2, 3].each((i) => console.log(i));
// 1, 2, 3
```

**elementAt**

Returns the element at a specified zero-based index in a sequence.

*Syntax*

    elementAt(index: number) => T
    elementAt(index: number, defaultValue: any) => T|defaultValue

*Usage*

```
let el = [0, 0, 0, 1, 'a', 2, 1, '1'].elementAt(6);
// el => 1

let dv = [].elementAt(10, 'defaultValue');
// dv => 'defaultValue'

let n = [].elementAt(-10);
// n => undefined
```

**except**

Produces the set difference of two sequences by using the equality comparer to compare values.

*Syntax*

    except(otherSequence: Iterable<T>) => _Linqable<T>
    except(otherSequence: Iterable<T>, equalityComparer: (item1: T, item2: T)) => _Linqable<T>

*Usage*

```
let a1 = [1, 2, 3];
let a2 = [3, 2, 1, 2, 0];
let a = a1.except(a2).toArray()
// a => []

let a1 = ['a', 'b', 1, null];
let a2 = [null, 1, 'b'];
let a = a1.except(a2).toArray();
// a => ['a']    

let a1 = [8, 0, '1', '2'];
let a2 = [1, 2];
let a = a1.except(a2, (item1, item2) => item1 == item2).toArray()
// a => [8, 0]
```

**first**

Returns the first element of a sequence. Throws an except if no element found.

*Syntax*

    first() => T
    first((item: T) => boolean) => T

*Usage*

```
let a = [5, 'a'].first();
// a => 5

let f = [].first()
// throw an exception

let a = [5, 0, 1, 'a', 'b', 'c', 'a'].first(i => i === 'a');
// a => 'a'

let a = ['1', 2, '3'].first(i => i == 3);
// a => '3'
```

**firstOrDefault**

Returns the first element of the sequence that satisfies a condition or a default value if no such element is found.

*Syntax*

    firstOrDefault((item: T) => boolean, defaultValue: any) => T

*Usage*

```
let d = [1, 2, 3].firstOrDefault(i => false, 5);
// d => 5
```

**groupBy**

Groups the elements of a sequence.

*Syntax*

    groupBy(keySelector: (item: T) => TKey) => _Linqable<{ key: TKey, value: T[] }>
    groupBy(keySelector: (item: T) => TKey, elementSelector: (item: T) => TResult) => _Linqable<{ key: TKey, value: T[] }>
    groupBy(keySelector: (item: T) => TKey, elementSelector: (item: T) => TResult, resultSelector: (result: TResult) => TGroup) => { key: TKey, value: TGroup }>

*Usage*

```
let r = [1, 2, 3, 'a', 'b', 'c'].groupBy(i => Number.isInteger(i) ? 'Number' : 'Letter').toArray();

assert.equal(r.length, 2);
assert.strictEqual(r[0].key, 'Number');
assert.deepEqual(r[0].value, [1, 2, 3]);
assert.strictEqual(r[1].key, 'Letter');
assert.deepEqual(r[1].value, ['a', 'b', 'c']);

// r => [{ key: 'Number', value: [1, 2, 3] }, { key: 'Letter', value: ['a', 'b', 'c'] }]
```

**groupJoin**

Correlates the elements of two sequences based on equality of keys and groups the results.

*Syntax*

    groupJoin(inner: Iterable<TInner>, outerKeySelector: (item: TOuter) => TKey, innerKeySelector: (item: TInner) => TKey, resultSelector: (outer: TOuter, inner: Iterable<TInner>) => TResult) => _Linqable<TResult>

*Usage*

```
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

// Hedlund, Magnus:
//   Daisy
// Adams, Terry:
//   Barley
//   Boots
// Weiss, Charlotte:
//   Whiskers
```

**intersect**

Produces the set intersection of two sequences.

*Syntax*

    intersect(otherSequence: Iterable<T>) => _Linqable<T>
    intersect(otherSequence: Iterable<T>, equalityComparer(item1: T, item2: T) => boolean) => _Linqable<T>

*Usage*

```
let a1 = [1, 1, 2, '3', 4, '5', true, false, Number.MAX_SAFE_INTEGER];
let a2 = [3, 4, 4, 1, true, Number.MAX_SAFE_INTEGER];

let inter = a1.intersect(a2).toArray();
// inter => [1, 4, true, Number.MAX_SAFE_INTEGER]
```

joinWith

Correlates the elements of two sequences based on matching keys. 

*Syntax*

    joinWith(inner: Iterable<TInner>, outerKeySelector: (item: TOuter) => TKey, innerKeySelector: (item: TInner) => TKey, resultSelector: (TOuter, TInner) => TResult) => _Linqable<T>
    joinWith(inner: Iterable<TInner>, outerKeySelector: (item: TOuter) => TKey, innerKeySelector: (item: TInner) => TKey, resultSelector: (TOuter, TInner) => TResult, keyEqualityComparer: (key1: TKey, key2: TKey) => boolean) => _Linqable<T>

```
let magnus = { Name: "Hedlund, Magnus" };
let terry = { Name: "Adams, Terry" };
let charlotte = { Name: "Weiss, Charlotte" };

let barley = { Name: "Barley", Owner: terry };
let boots = { Name: "Boots", Owner: terry };
let whiskers = { Name: "Whiskers", Owner: charlotte };
let daisy = { Name: "Daisy", Owner: magnus };

let people = [magnus, terry, charlotte];
let pets = [barley, boots, whiskers, daisy];

let peopleWithPets = people.joinWith(pets, person => person, pet => pet.Owner, (person, pet) => { return { OwnerName: person.Name, Pet: pet.Name }}).toArray();

// Result: 
// Hedlund, Magnus - Daisy
// Adams, Terry - Barley
// Adams, Terry - Boots
// Weiss, Charlotte - Whiskers
```

**last**

Returns the last element of a sequence.

*Syntax*

    last() => T
    last(predicate: (item: T) => boolean) => T
    last(predicate: (item: T) => boolean, defaultValue: T) => T|defaultValue

*Usage*

```
let last = [1, 1, ',', undefined].last();
// last => undefined

let lastDv = [].last(i => true, 2);
// lastDv => 2
```

**max**

Returns the maximum value in a sequence.

*Syntax*

    max() => T
    max(keySelector: (item: T) => TKey) => T
    max(keySelector: (item: T) => TKey, comparer: (item1: T, item2: T) => 1|0|-1) => T

*Usage*

```
let max = [1, -Infinity, -.2, 2, '5'].max();
// max => '5'

let max = [1, -Infinity, -.2, 2, '5.1'].max(i => Number.parseFloat(i));
// max => '5.1';
```

**min**

Returns the minimum value in a sequence.

*Syntax*

    min() => T
    min(keySelector: (item: T) => TKey) => T
    min(keySelector: (item: T) => TKey, comparer: (item1: T, item2: T) => 1|0|-1) => T

*Usage*

```
let a = [-Infinity, 0].min();
// a => -Infinity
```
**ofType**

Filters the elements of an sequence based on a specified type.

*Syntax*

    ofType(type) => _Linqable<T>

*Usage*

```
class MyType {

}
let myObj = new MyType();

let arr = [1, 'a', '1', new function() {}, null, 2, 
'zbc', Symbol.iterator, undefined, true, false, true,
myObj, NaN];

let num = arr.ofType('number').toArray();
// num => [1, 2];

let bools = arr.ofType('boolean').toArray();
// bools => [true, false, true];

let mys = arr.ofType(MyType).toArray();
// mys => [myObj]

let arrayList = [[128], [], [], 3, 'x'];
let x = arrayList.ofType(Array).toArray();
// x => [[128], [], []]
```

**orderBy, orderByDescending**

Sorts the elements of a sequence in ascending/descending order

*Syntax*

    orderBy() => _Linqable<T>
    orderBy(keySelector: (item: T) => TKey) => _Linqable<T>
    orderBy(keySelector: (item: T) => TKey, comparer: (item1: T, item2: T) => 1|0|-1) => _Linqable<T>
    orderByDescending() => _Linqable<T>
    orderByDescending(keySelector: (item: T) => TKey) => _Linqable<T>
    orderByDescending(keySelector: (item: T) => TKey, comparer: (item1: T, item2: T) => 1|0|-1) => _Linqable<T>

*Usage*

```
let unorderedlist = [1, Infinity, -8, 3, -0, +0, (-Infinity)];
let ordered = unorderedList.orderBy(i => i).toList();
// ordered => [-Infinity, -8, -0, +0, 1, 3, Infinity]

let bottomUp = unorderedlist.orderByDescending().toList();
// bottomUp => [Infinity, 3, 1, +0, -0, -8, -Infinity]

let byLength = ['12', 'abc', ''].orderBy((i) => i.length).toList();
// byLength => ['', '12', 'abc']
```

**reversed**

Inverts the order of the elements in a sequence.

*Syntax*

    reversed() => _Linqable<T>

*Usage*

```
let a = [1, 2, 3].reversed().toList();
// a => [3, 2, 1]
```

**select**

Projects each element of a sequence into a new form. It also be called *map* by other languages.

*Syntax*

    select(transform: (item: T, index: number) => TResult) => _Linqable<TResult>

*Usage*

```
let n = [1, 2, 3, -1, 2, 1].select(i => i * 2).toList();
// n => 2, 4, 6, -2, 4, 2
```
**selectMany**

Projects each element of a sequence to an _Linqable<T> and flattens the resulting sequences into one sequence.

*Syntax*

    selectMany(selector: (item: T, index: number) => Iterable<T>) => _Linqable<TResult>

*Usage*

```
let multi = [[1, 2, 3], [4, 5 ,6], 7];
let fl = multi.selectMany(i => i).toArray();
// fl => [1, 2, 3, 4, 5, 6, 7]

let deep = [[1, [2, 3, 4], 5], [6, 7], 8];
let fl = deep.selectMany(i => i).toArray();
// fl => [1, [2, 3, 4], 5, 6, 7, 8]

let sn = [['abc', 'efg'], 'hijk', ['l', ['n', 'a', ['z'], [[[['m'], 90], []]]]], 2, ['l']].flatten().toArray();
// sn => ['abc', 'efg', 'hijk', 'l', 'n', 'a', 'z', 'm', 90, 2, 'l']
```

**sequenceEqual**

Determines whether two sequences are equal by comparing the elements by using equality comparer for their type.

*Syntax*

    sequenceEqual(otherSeq: Iterable<T>) => boolean
    sequenceEqual(otherSeq: Iterable<T>, equalityComparer: (item1: T, item2: T) => boolean) => boolean

*Usage*

```
let a1 = ['1', '2', '3', 4, 5];
let a2 = ['1', '2', '3', 4, 5];

let b = a1.sequenceEqual(a2);
// b => true

let b2 = a1.sequenceEqual(['1', '2', '3', 4])
// b2 => false
```

**single, singleOrDefault**

Returns the only element of a sequence that satisfies a specified condition or a default value if no such element exists; this method throws an exception if more than one element satisfies the condition or sequence is empty.

*Syntax*

    single() => T
    single(predicate: (item: T) => boolean) => T
    singleOrDefault(predicate: (item: T) => boolean, defaultValue) => T|defaultValue

*Usage*

```
let arr = [1, '2', 3, 3, 2, ''];
let n = arr.single(i => i === 2);
// n => 2

let m = arr.single(i => i == 2);
// throws an exception

let dv = arr.singleOrDefault(i => i === 5, 0);
// dv => 0
```

**skip**

Bypasses a specified number of elements in a sequence and then returns the remaining elements.

*Syntax*

    skip(count: number) => _Linqable<T>

*Usage*

```
let a = [1, 2, 3, 4, 5, 6, 7, 8];
let sk = a.skip(3).toArray();
// sk => [4, 5, 6, 7, 8]

let sk = a.skip('7').toArray();
// sk => [8]
```

**skipWhile**

Bypasses elements in a sequence as long as a specified condition is true and then returns the remaining elements. The element's index is used in the logic of the predicate function.

*Syntax*

    skipWhile(predicate: (item: T) => boolean) => _Linqable<T>

*Usage*

```
let n = [5000, 2500, 9000, 8000, 6500, 4000, 1500, 5500];
let sk = n.skipWhile((i, index) => i > 1000 * index).toArray();
// sk => [4000, 1500, 5500]
```

**sum**

Computes the sum of a sequence.

*Syntax*

    sum() => number
    sum(transform: (item: T) => number) => number

*Usage*

```
let a = ['1', 1, 1].sum();
// a => 3

let a = ['1', 1, 1].sum(i => typeof i === 'string' ? 0 : i);
// a => 2
```

**take**

Returns a specified number of contiguous elements from the start of a sequence.

*Syntax*

    take(count: number) => _Linqable<T>

*Usage*

```
let arr = [1, 2, 4, 5, 8, ['a', 'b', [[['a', ['a'], [2]]]]], 10, -1];
let t = arr.take(5).toArray();
// t => [1, 2, 4, 5, 8]

let ft = arr.skip(5).take(1).flatten().toArray();
// ft => ['a', 'b', 'a', 'a', 2]
```

**takeWhile**

Returns elements from a sequence as long as a specified condition is true. The element's index is used in the logic of the predicate function.

*Syntax*

    takeWhile(predicate: (item: T) => boolean) => _Linqable<T>

*Usage*

```
let fruits = ["apple", "passionfruit", "banana", "mango", "orange", "blueberry", "grape", "strawberry"];
let t = fruits.takeWhile((i, index) => i.length > index).toArray();
// t => ['apple', 'passionfruit', 'banana', 'mongo', 'orange', 'blueberry']
```

**thenBy, thenByDescending**

See orderBy, orderByDescending.

**toArray, toList**

Creates an array from iterable sequence.

*Syntax*

    toArray() => T[];
    toList() => T[];

*Usage*

```
let a = [1, 2, 3, 4, 5].where(i => i > 3).toArray();
// a => [4, 5]
```

**toMap, toDictionary**

Creates a `Map<k, v>` from an `Iterable<T>` according to a specified key selector function.

*Syntax*

    toMap(keySelector: (item: T) => TKey) => Map<TKey, T>
    toMap(keySelector: (item: T) => TKey, elementSelector: (item: T) => TValue) => Map<TKey, TValue>

*Usage*

```
let coms = [
    { Company: "Coho Vineyard", Weight: 25.2, TrackingNumber: 89453312 },
    { Company: "Lucerne Publishing", Weight: 18.7, TrackingNumber: 89112755 },
    { Company: "Wingtip Toys", Weight: 6.0, TrackingNumber: 299456122 },
    { Company: "Adventure Works", Weight: 33.8, TrackingNumber: 4665518773 } ];

let map = coms.toMap(c => c.TrackingNumber, p => p.Company + " " + p.TrackingNumber);
// map.keys(): [89453312, 89112755, 299456122, 4665518773]
```

**union**

Produces the set union of two sequences.

*Syntax*

    union(otherSeq: Iterable<T>) => _Linqable<T>
    union(otherSeq: Iterable<T>, equalityComparer: (item1: T, item2: T) => boolean) => _Linqable<T>

*Usage*

```
let a1 = [1, 1, 2, 1, 2, 4, 2, 4];
let a2 = [1, 3, 2, 1, 4, '1', '2'];

let u = a1.union(a2).toArray();
// u => [1, 2, 4, 3, '1', '2']

let u2 = a1.union(a2, (i1, i2) => i1 == i2).toArray();
// u2 => [1, 2, 4, 3]
```

**where**

Filters a sequence of values based on a predicate.

*Syntax*

    where(predicate: (item: T, index: number) => boolean) => _Linqable<T>

*Usage*

```
let numArray = [-10, 20, -5, 5, 8, Number.MAX_VALUE];
var fa = numArray.where(i => i > 0);
// fa => [20, 5, 8, Number.MAX_VALUE]
```

**zip**

Applies a specified function to the corresponding elements of two sequences, producing a sequence of the results.

*Syntax*

    zip() => _Linqable<T>
    zip(second: Iterable<TSecond>, func: (item1: T, item2: TSecond) => TResult) => _Linqable<TResult>

*Usage*

```
let a1 = [1, 2, 3, 4];
let w1 = [ "one", "two", "three" ];

let z = a1.zip(w1, (i1, i2) => `${i1} ${i2}`).toArray();
// z => ['1 one', '2 two', '3 three']

let zn = a1.zip(w1).toArray();
// zn => [[1, 'one'], [2, 'two'], [3, 'three']]
```

---

License under MIT
