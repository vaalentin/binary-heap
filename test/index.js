import test from 'tape';
import BinaryHeap from '../src';

test('should tell if empty', t => {
  t.plan(3);

  const heap = new BinaryHeap();
  
  t.ok(heap.isEmpty(), 'heap is empty');
  
  heap.push(1);

  t.notOk(heap.isEmpty(), 'heap is no longer empty');

  heap.pop();

  t.ok(heap.isEmpty(), 'heap is empty again');
});

test('should throws if trying to pop while empty', t => {
  t.plan(1);

  const heap = new BinaryHeap();

  t.throws(() => heap.pop(), Error, 'can\'t pop an empty heap');
});

test('should order values', t => {
  t.plan(1);

  const numbers = [];
  for(let i = 0; i < 100; i++) {
    numbers[i] = Math.random() * 100;
  }

  const sorted = numbers.sort((a, b) => a - b);

  const heap = new BinaryHeap();
  randomNumbers.forEach(n => heap.push(n));

  const result = [];
  while(!heap.isEmpty()) {
    result.push(heap.pop());
  }

  t.deepEqual(sorted, result);
});

test('should accept custom comparison function', t => {
  t.plan(1);

  class Node {
    constructor(weight) {
      this.weight = weight;
    }
  }

  const nodes = [];
  for(let i = 0; i < 100; i++) {
    nodes.push(new Node(Math.random() * 100));
  }

  const sorted = nodes.sort((a, b) => a.weight - b.weight);

  const heap = new BinaryHeap((a, b) => a.weight - b.weight);
  nodes.forEach(n => heap.push(n));

  const result = [];
  while(!heap.isEmpty()) {
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

  const result = [];
  while(!heap.isEmpty()) {
    result.push(heap.pop());
  }

  const weights = result.map(n => n.weight);

  t.deepEqual(weights, [2, 5, 100], 'node was correctly updated');
});
