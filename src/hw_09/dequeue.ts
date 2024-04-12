import { TArrayConstructor, TypedArray } from './types';
import { LinkList } from './linked_list_typed_array';

class Dequeue {
  TypedArray: TypedArray;
  capacity: number;
  buffer: ArrayBuffer;
  firstIndex: number;
  lastIndex: number;
  leftNode: TypedArray;
  rightNode: TypedArray;
  extendedArray: LinkList;
  arrayConscructor: TArrayConstructor;
  middleTypedArray: number;
  length: number = 0;

  constructor(typedArray: TArrayConstructor, capacity: number) {
    const buffer = new ArrayBuffer(capacity * typedArray.BYTES_PER_ELEMENT);
    this.capacity = capacity;
    this.buffer = buffer;
    this.TypedArray = new typedArray(buffer);

    this.middleTypedArray = Math.floor(this.TypedArray.length / 2);

    this.firstIndex = this.middleTypedArray;
    this.lastIndex = this.middleTypedArray;

    this.extendedArray = new LinkList();
    this.extendedArray.push(this.TypedArray);

    this.arrayConscructor = typedArray;

    this.leftNode = this.TypedArray;
    this.rightNode = this.TypedArray;
  }

  public insertLeft(value: number) {
    if (this.lastIndex === this.firstIndex) {
      this.lastIndex++;
    }

    if (this.firstIndex < 0) {
      const buffer = new ArrayBuffer(this.capacity * this.TypedArray.BYTES_PER_ELEMENT);
      const newTypedArray = new this.arrayConscructor(buffer);

      const linkedList = this.extendedArray;
      linkedList.unshift(newTypedArray);

      if (linkedList.first && linkedList.first.value) {
        this.leftNode = linkedList.first.value;
      }

      this.firstIndex = this.capacity - 1;
    }

    this.length++;

    this.leftNode[this.firstIndex--] = value;
  }

  public insertRight(value: number) {
    if (this.lastIndex === this.firstIndex) {
      this.firstIndex--;
    }

    if (this.lastIndex >= this.capacity) {
      const buffer = new ArrayBuffer(this.capacity * this.TypedArray.BYTES_PER_ELEMENT);
      const newTypedArray = new this.arrayConscructor(buffer);

      const linkedList = this.extendedArray;
      linkedList.push(newTypedArray);

      if (linkedList.last && linkedList.last.value) {
        this.rightNode = linkedList.last.value;
      }

      this.lastIndex = 0;
    }

    this.length++;
    this.rightNode[this.lastIndex++] = value;
  }

  deleteRight() {
    if (!this.length) {
      console.log('Empty!!!');
      return null;
    }

    if (this.lastIndex <= 0) {
      const linkedList = this.extendedArray;

      linkedList.deleteLast();

      if (linkedList.last) {
        this.rightNode = linkedList.last.value;
      }

      this.lastIndex = this.capacity - 1;
    } else {
      this.lastIndex--;
    }

    this.length--;
    return this.rightNode[this.lastIndex];
  }

  deleteLeft() {
    if (!this.length) {
      console.log('Empty!!!');
      return null;
    }

    if (this.firstIndex >= this.capacity) {
      const linkedList = this.extendedArray;

      linkedList.deleteFirst();

      if (linkedList.first) {
        this.leftNode = linkedList.first.value;
      }

      this.firstIndex = 0;
    } else {
      this.firstIndex++;
    }

    this.length--;
    return this.leftNode[this.firstIndex];
  }
}

const dequeue = new Dequeue(Uint8Array, 64);

let cur = 6;
while (cur !== 0) {
  dequeue.insertRight(cur);
  cur--;
}

let curLeft = 6;
while (curLeft !== 0) {
  dequeue.insertLeft(curLeft);
  curLeft--;
}
