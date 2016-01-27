import test from 'tape';
import BinaryHeap from '../src';

test('should tell if empty', t => {
  t.plan(3);

  const heap = new BinaryHeap();
  
  t.equal(heap.isEmpty(), true, 'heap is empty');
  
  heap.push(1);

  t.equal(heap.isEmpty(), false, 'heap is no longer empty');

  heap.pop();

  t.equal(heap.isEmpty(), true, 'heap is empty again');
});

test('should throws if trying to pop while empty', t => {
  t.plan(1);

  const heap = new BinaryHeap();

  t.throws(() => heap.pop(), Error, 'can\'t pop an empty heap');
});

test('should give children and parent index', t => {
  t.plan(4);

  const heap = new BinaryHeap();

  /**
   * We use an array to lay down the data, in the form:
   * [parent, leftChild, rightChild, leftChildLeftChild, leftChildRightChild, etc...]
   */

  const leftChildIndex = heap.getLeftChildIndex(0);
  const rightChildIndex = heap.getRightChildIndex(0);
  const firstParentIndex = heap.getParentIndex(1);
  const secondParentIndex = heap.getParentIndex(2);

  t.equal(leftChildIndex, 1, 'left child index is correct');
  t.equal(rightChildIndex, 2, 'right child index is correct');
  t.equal(firstParentIndex, 0, 'left child parent is correct')
  t.equal(secondParentIndex, 0, 'right child parent is correct')
});

test('should order values', t => {
  t.plan(1);

  const sampleSize = 10;

  const numbers = [];
  for(let i = 0; i < sampleSize; i++) {
    numbers[i] = Math.random() * 100;
  }

  const sorted = numbers.sort((a, b) => a - b);

  const heap = new BinaryHeap();
  numbers.forEach(n => heap.push(n));

  let i = 0;
  const result = [];
  while(!heap.isEmpty()) {
    if(i++ > sampleSize) break; 
    result.push(heap.pop());
  }

  t.deepEqual(sorted, result);
});

test('should accept custom comparison function', t => {
  t.plan(1);

  const sampleSize = 10;

  class Node {
    constructor(weight) {
      this.weight = weight;
    }
  }

  const nodes = [];
  for(let i = 0; i < sampleSize; i++) {
    nodes.push(new Node(Math.random() * 100));
  }

  const sorted = nodes.sort((a, b) => a.weight - b.weight);

  const heap = new BinaryHeap((a, b) => a.weight - b.weight);
  nodes.forEach(n => heap.push(n));

  let i = 0;

  const result = [];
  while(!heap.isEmpty()) {
    if(i++ > sampleSize) break;
    result.push(heap.pop());
  }

  t.deepEqual(sorted, result);
});

test('should be able to update a node', t => {
  t.plan(1);

  class Node {
    constructor(weight) {
      this.weight = weight;
    }
  }

  const heap = new BinaryHeap((a, b) => a.weight - b.weight);

  const node = new Node(100);

  heap.push(new Node(2));
  heap.push(node);
  heap.push(new Node(10));

  node.weight = 5;
  heap.update(node);

  let i = 0;
  const result = [];
  while(!heap.isEmpty()) {
    if(i++ > 3) break;
    result.push(heap.pop());
  }

  const weights = result.map(n => n.weight);

  t.deepEqual(weights, [2, 5, 100], 'node was correctly updated');
});
