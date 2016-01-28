export default class BinaryHeap {
  constructor(comparison = (a, b) => a - b) {
    this._comparision = comparison;
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
    if(index === 0) {
      return;
    }

    const parentIndex = this.getParentIndex(index);

    if(this._comparision(this._nodes[parentIndex], this._nodes[index]) > 0) {
      const temp = this._nodes[parentIndex];
      this._nodes[parentIndex] = this._nodes[index];
      this._nodes[index] = temp;
      this.siftUp(parentIndex);
    }
  }

  siftDown(index) {
    const leftChildIndex = this.getLeftChildIndex(index);
    const rightChildIndex = this.getRightChildIndex(index);

    let smallestChildIndex;

    if(rightChildIndex >= this._heapSize) {
      // last node in the tree
      if(leftChildIndex >= this._heapSize) {
        return;
      } else {
        smallestChildIndex = leftChildIndex;
      }
    } else {
      if(this._comparision(this._nodes[leftChildIndex], this._nodes[rightChildIndex]) <= 0) {
        smallestChildIndex = leftChildIndex;
      } else {
        smallestChildIndex = rightChildIndex;
      }
    }

    if(this._comparision(this._nodes[index], this._nodes[smallestChildIndex]) > 0) {
      const tmp = this._nodes[smallestChildIndex];
      this._nodes[smallestChildIndex] = this._nodes[index];
      this._nodes[index] = tmp;
      this.siftDown(smallestChildIndex);
    }
  }

  isEmpty() {
    return this._heapSize <= 0;
  }

  push(node) {
    this._heapSize++;
    this._nodes[this._heapSize - 1] = node;
    this.siftUp(this._heapSize - 1);
  }

  pop() {
    const node = this.peek();
    this._nodes[0] = this._nodes[this._heapSize - 1];
    this._heapSize--;
    if(this._heapSize > 0) {
      this.siftDown(0);
    }
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
