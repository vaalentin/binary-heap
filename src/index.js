export default class BinaryHeap {
  constructor() {
    this._nodes = [];
    this._heapSize = 0;
  }

  getLeftChildIndex(index) {
    return 2 * index + 1;
  }

  getRightChildIndex(index) {
    return 2 * index + 2;
  }

  getParentIndex(index) {
    return Math.floor((index - 1) / 2);
  }

  siftUp(index) {

  }

  siftDown(index) {

  }

  isEmpty() {
    return this._heapSize <= 0;
  }

  push(node) {
    this._heapSize++;
    this._nodes.push(node);
  }

  pop() {
    const node = this.peek();
    this._nodes[0] = this._nodes[this._heapSize - 1];
    this._heapSize--;
    return node;
  }

  peek() {
    if(this.isEmpty()) {
      throw new Error('Heap is empty');
    } else {
      return this._nodes[0];
    }
  }

  update(node) {

  }

  dispose() {
    
  }
}
