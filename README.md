# KINQ

**KINQ is LINQ for Node.js bases on ES6.**

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

 - Deferred Execution Operators

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

There are **deferred execution operators** and **immediate evaluation operators** in KINQ. Deferred execution operators are not going to evaluate the result what you need till meets an immediate evaluation operator. So, it's also called **lazy evaluation**.

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

// To transform an iterable object to linqable.
KINQ.toLinqable(iterableObj);

```

**aggregate**

Applies an accumulator function over a sequence. The specified seed value is used as the initial accumulator value. In other languages, it may be called *reduce*.

    aggreagte(func: (current: T, next: T) => T) => T

    aggregate(seed: T, func: (seed: T, start: T) => T) => T

    aggregate(seed: T, func: (seed: T, start: T) => T, resultSelector: (result: T) => TResult) => TResult

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

    all((item: T) => boolean) => boolean

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

    any() => boolean

    any((item: T) => boolean) => boolean

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

    average() => number

    average((item: T) => TResult) => number

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

    concatenate(otherSequence: Iterable<T>) => _Linqable<T>

```
let a1 = [1, 2, 3];
let a2 = ['a', 'b', 'c'];
    
let a = a1.concatenate(a2).toArray();
// a => [1, 2, 3, 'a', 'b', 'c']
```

**contains**

Determines whether a sequence contains a specified element by using the default/specified equality comparer.

    contains(item: any) => boolean
    contains(item: any, equalityComparer(item1, item2) => boolean) => boolean

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

    count() => number
    count((item) => boolean) => number

```
let c = [1, 1, 1, 1, 1].count();
// c => 5

let c = [null, '', 1, [], true].count(i => false);
// c => 0
```
