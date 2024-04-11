import { TArrayConstructor, TypedArray } from './types';
import { LinkList } from './linked_list_typed_array';

class Dequeue {
  TypedArray: TypedArray;
  capacity: number;
  buffer: ArrayBuffer;
  private firstIndex: number;
  private lastIndex: number;
  leftNode: TypedArray;
  rightNode: TypedArray;
  extendedArray: LinkList;
  private arrayConscructor: TArrayConstructor;
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

  popRight() {
    if (!this.length) {
      console.log('Empty!!!');
      return;
    }

    if (this.lastIndex < 0) {
      const linkedList = this.extendedArray;

      linkedList.deleteLast();

      if (linkedList.last) {
        this.rightNode = linkedList.last.value;
      }
    }
  }
}

const dequeue = new Dequeue(Uint8Array, 64);

// vec.pushLeft(1); // Возвращает длину - 1
// vec.pushLeft(2); // 2
// vec.pushLeft(3); // 3
//
// // console.log(dequeue.length); // 3
// vec.popLeft(); // Удаляет с начала, возвращает удаленный элемент - 3
//
// vec.pushRight(4);
// vec.pushRight(5);
// vec.pushRight(6);
//
// vec.popRight(); // Удаляет с конца, возвращает удаленный элемент - 6

// console.log(dequeue);

// dequeue.insertLeft(32);
// dequeue.insertLeft(33);
// dequeue.insertLeft(34);
// dequeue.insertLeft(35);
// dequeue.insertLeft(36);
// dequeue.insertLeft(37);
// dequeue.insertLeft(38);
// dequeue.insertLeft(39);
// dequeue.insertLeft(40);

let cur = 100;
while (cur !== 0) {
  dequeue.insertRight(cur);
  cur--;
}

let curLeft = 100;
while (curLeft !== 0) {
  dequeue.insertLeft(curLeft);
  curLeft--;
}

// console.log(dequeue.TypedArray);
// console.log(dequeue.extendedArray);

for (const el of dequeue.extendedArray) {
  console.log(el?.value);
}

console.log(dequeue.length);
