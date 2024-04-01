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

  constructor(TypedArray: TArrayConstructor, options: IVectorOptions) {
    this.ArrayConstructor = TypedArray;
    const buffer = new ArrayBuffer(options.capacity * TypedArray.BYTES_PER_ELEMENT);
    this.typedArray = new TypedArray(buffer);
    this.capacity = options.capacity;
    this.buffer = buffer;
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
      this.buffer = newArrayBuffer;
    }

    this.typedArray[this.length++] = value;

    return this.length;
  }

  public pop(){}
}

const vec = new Vector(Int32Array, { capacity: 4 });

console.log(vec.push(1));
console.log(vec.push(2));
console.log(vec.push(3));
console.log(vec.push(4));
console.log(vec.push(5));

console.log(vec.typedArray);
console.log(vec.capacity);
console.log(vec.length);
console.log(vec.buffer.byteLength);
