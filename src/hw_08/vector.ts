// const vec = new Vector(Int32Array, {capacity: 4});

interface IVectorOptions {
  capacity: number;
}

type TArrayConstructor =
  | Int8ArrayConstructor
  | Int16ArrayConstructor
  | Int32ArrayConstructor;

class Vector {
  public typedArray: Int8Array | Int16Array | Int32Array;
  public capacity: number = 0;
  public length = 0;
  public buffer: ArrayBuffer;
  private ArrayConstructor: TArrayConstructor;
  private initCapacity: number;

  constructor(TypedArray: TArrayConstructor, options: IVectorOptions) {
    this.ArrayConstructor = TypedArray;
    const buffer = new ArrayBuffer(options.capacity * TypedArray.BYTES_PER_ELEMENT);
    this.typedArray = new TypedArray(buffer);
    this.capacity = options.capacity;
    this.buffer = this.typedArray.buffer;
    this.initCapacity = options.capacity;
  }

  public push(value: number) {
    if (this.typedArray.length === this.length) {
      this.capacity = this.capacity * 2;
      const newArrayBuffer = new ArrayBuffer(
        this.capacity * this.ArrayConstructor.BYTES_PER_ELEMENT,
      );

      const newTypedArray = new this.ArrayConstructor(newArrayBuffer);
      newTypedArray.set(this.typedArray);
      this.typedArray = newTypedArray;
      this.buffer = this.typedArray.buffer;
    }

    this.typedArray[this.length++] = value;

    return this.length;
  }

  public pop() {
    if (this.length !== 0) {
      const currentCursor = this.length - 1;
      this.typedArray[currentCursor] = 0;

      return this.typedArray[--this.length];
    } else {
      throw new Error('Empty');
    }
  }

  public shrinkToFit() {
    const initCapacity = this.initCapacity;
    const shrunkBuffer = this.typedArray.slice(0, initCapacity);

    this.buffer = shrunkBuffer;
    this.length = initCapacity;
    this.capacity = initCapacity;

    return shrunkBuffer;
  }

  public values() {
    let cursor = 0;
    const length = this.length;
    const typedArray = this.typedArray;

    return {
      [Symbol.iterator]() {
        return this;
      },

      next() {
        const currentCursor = cursor;
        cursor = cursor + 1;

        return { value: typedArray[currentCursor], done: currentCursor === length };
      },
    };
  }
}

const vec = new Vector(Int32Array, { capacity: 4 });

vec.push(1);
vec.push(2);
vec.push(3);
vec.push(4);

console.log(vec.typedArray);
console.log(vec.capacity);
console.log(vec.length);
console.log(vec.buffer);
console.log(vec.buffer.byteLength);

console.log(vec.pop());
console.log(vec.pop());
console.log(vec.pop());
console.log(vec.pop());

vec.push(1);
vec.push(2);
vec.push(3);
vec.push(4);
vec.push(5);

const i = vec.values();

console.log('length' + vec.length);

for (const a of i) {
  console.log('el ' + a);
}

vec.shrinkToFit();

console.log(vec.typedArray);
console.log(vec.capacity);
console.log(vec.length);
console.log(vec.buffer);
console.log(vec.buffer.byteLength);
