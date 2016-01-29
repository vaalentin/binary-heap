# Binary Heap

[![Build Status](https://travis-ci.org/vaalentin/binary-heap.svg?branch=master)](https://travis-ci.org/vaalentin/binary-heap)

Simple js implementation of a [binary heap](https://en.wikipedia.org/wiki/Binary_heap).
Mostly used for the [heapsort](https://en.wikipedia.org/wiki/Heapsort) algorithm, or as a [priority queue](https://en.wikipedia.org/wiki/Priority_queue).

## Installation

```sh
$ npm install --save @vaalentin/binary-heap
```

## Usage

```js
import BinaryHeap from '@vaalentin/binary-heap';

const heap = new BinaryHeap((a, b) => {
  return a.length - b.length;
});

heap.push('abcd');
heap.push('ab');

const value = heap.pop(); // ab
```

## API

#### `heap = new BinaryHeap(fn)`

Creates a new heap, where `fn` is an optional comparison function.
The comparison function takes the same form as the one for [Array.sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort).

```js
function compare(a, b) {
  if (a is less than b by some ordering criterion) {
    return -1;
  }

  if (a is greater than b by the ordering criterion) {
    return 1;
  }

  // a must be equal to b
  return 0;
}
```

#### `isEmpty = heap.isEmpty()`

#### `heap.push(node)`

Push a new node to the tree.

#### `node = heap.pop()`

Pop the first node from the tree.

#### `heap.update(node)`

Update a specific node.

```js
node.value = 12; // update value
heap.update(node); // update node
```

#### `heap.dispose()`

## License

MIT, see [LICENSE.md](https://github.com/vaalentin/binary-heap/blob/master/LICENSE.md) for more details.
