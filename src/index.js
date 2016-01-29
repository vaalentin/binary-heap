/**
 * @function ascending
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
export function ascending(a, b) {
  return a - b;
}

/**
 * @function descending
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
export function descending(b, a) {
  return b - a;
}

/**
 * @class BinaryHeap
 */
export default class BinaryHeap {
  /**
   * @constructs BinaryHeap
   * @param {(a, b) => number} [comparison = ascending]
   */ 
  constructor(comparison = ascending) {
    this._comparision = comparison;
    this._nodes = [];
    this._heapSize = 0;
  }

  /**
   * @method getLeftChildIndex
   * @private
   * @param {uint} index
   */
  getLeftChildIndex(index) {
    return 2 * index + 1;
  }

  /**
   * @method getRightChildIndex
   * @private
   * @param {uint} index
   */
  getRightChildIndex(index) {
    return 2 * index + 2;
  }

  /**
   * @method getParentIndex
   * @private
   * @param {uint} index
   */
  getParentIndex(index) {
    return Math.floor((index - 1) / 2);
  }

  /**
   * @method siftUp
   * @private
   * @param {uint} index
   */
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

  /**
   * @method siftDown
   * @private
   * @param {uint} index
   */
  siftDown(index) {
    const leftChildIndex = this.getLeftChildIndex(index);
    const rightChildIndex = this.getRightChildIndex(index);

    let smallestChildIndex;

    if(rightChildIndex >= this._heapSize) {
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

  /**
   * @method isEmpty
   * @public
   * @returns {boolean}
   */
  isEmpty() {
    return this._heapSize <= 0;
  }

  /**
   * @method peek
   * @public
   * @returns {any}
   */
  peek() {
    if(this.isEmpty()) {
      throw new Error('Heap is empty');
    } else {
      return this._nodes[0];
    }
  }

  /**
   * @method push
   * @public
   * @param {any} node
   */
  push(node) {
    this._heapSize++;
    this._nodes[this._heapSize - 1] = node;
    this.siftUp(this._heapSize - 1);
  }

  /**
   * @method pop
   * @public
   * @returns {any}
   */
  pop() {
    const node = this.peek();
    this._nodes[0] = this._nodes[this._heapSize - 1];
    this._heapSize--;
    if(this._heapSize > 0) {
      this.siftDown(0);
    }
    return node;
  }

  /**
   * @method update
   * @public
   * @param {any} node
   */
  update(node) {
    const index = this._nodes.indexOf(node);

    if(index === -1) {
      throw new Error('Trying to update a non existing node');
    }

    this.siftDown(index);
    this.siftUp(index);
  }

  /**
   * @method dispose
   * @public
   */
  dispose() {
    this._nodes = null;
  }
}
