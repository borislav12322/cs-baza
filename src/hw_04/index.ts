// function binary(num: number) {
//   const str = new Uint32Array([num])[0].toString(2);
//   return '0b' + str.padStart(32, '0').replace(/(.{4})(?!$)/g, '$1_');
// }
// class BCD {
//   public numbers: number[] = [];
//   protected testNumber: bigint = 0n;
//
//   // Во избежание переполнение Double чисел на вход используем BigInt
//   constructor(num: bigint) {
//     this.testNumber = num;
//
//     let entryNumber = Number(num);
//
//     while (entryNumber > 0) {
//       const digit = entryNumber % 10;
//       console.log(digit);
//       entryNumber = Math.floor(entryNumber / 10);
//     }
//   }
//
//   createMask(len: number, pos: number) {
//     let r = ~0;
//     r <<= 32 - len;
//     r >>>= 32 - pos;
//     return r;
//   }
//
//   // Во избежание переполнение Double чисел на выход используем BigInt
//   valueOf(): {
//     bcd: bigint;
//     binary: string;
//   } {
//     let num = Number(this.testNumber);
//     let bcd = 0;
//     let step = 0;
//
//     while (num > 0) {
//       const digit = num % 10;
//
//       if (!bcd) {
//         bcd = digit << step;
//       } else {
//         bcd = (digit << step) | bcd;
//       }
//
//       step = step + 4;
//       num = Math.floor(num / 10);
//     }
//
//     return {
//       bcd: BigInt(bcd),
//       binary: bcd.toString(2),
//     };
//   }
//
//   // Возвращает разряд BCD числа по заданной позиции.
//   // Отрицательная позиция означает разряд "с конца".
//   get(pos: number): number {
//     console.log(this.testNumber);
//     return 1;
//   }
// }
//
// // const numberBCD = new BCD(65536n);
// // console.log(numberBCD.valueOf().bcd);
//
// // 65536n
// // console.log(n.valueOf()); // 0b01100101010100110110 или 415030n
//
// // console.log(((6 << 16) | (5 << 12) | (5 << 8) | (3 << 4) | 6).toString(2));
// // console.log(((6n << 16n) | (5n << 12n) | (5n << 8n) | (3n << 4n) | 6n).toString(2));
// // console.log((((~0 << 28) >>> 24) >>> 4).toString(2));
// // console.log((((~0 << 28) >> 24) >>> 4).toString(2));
//
// // console.log(((((2 << 8) | (9 << 4) | 7) & ((~0 << 28) >>> 24)) >>> 4).toString(2));
// // console.log(((~0 << 28) >>> 24).toString(2));
// // console.log(((~0 << 28) >>> 20).toString(2));
//
// // console.log((((~0 << 28) >>> 20) >>> 4).toString(2));
// // console.log(((((2 << 8) | (9 << 4) | 7) & ((~0 << 28) >>> 20)) >>> 8).toString(10));
// // console.log(((((2 << 8) | (9 << 4) | 7) & ((~0 << 28) >>> 24)) >>> 4).toString(10));
// //
// // console.log(((((2 << 8) | (9 << 4) | 7) & ((~0 << 28) >>> 28)) >>> 0).toString(10));
// // console.log(((((2 << 8) | (9 << 4) | 7) & ((~0 << 28) >>> 28)) >>> 0).toString(10));
// //
// // console.log(((((2 << 12) | (9 << 8) | (7 << 4) | 1) & ((~0 << 28) >>> 28)) >>> 0).toString(10));
// //
// // console.log(((2 << 8) | (9 << 4) | 7).toString(2));
// // console.log(binary(29));
//
// // console.log((~0 << 28).toString(2));
// // console.log(((~0 << 28) >> 20).toString(2));
//
// // console.log(((2 << 8) | (9 << 4) | 7).toString(2));
// // console.log((((~0 << 28) >>> 24) >>> 4).toString(2));
// // console.log(((((2 << 8) | (9 << 4) | 7) & ((~0 << 28) >>> 24)) >>> 4).toString(2));
// // console.log(((((2 << 8) | (9 << 4) | 7) & ((~0 << 28) >>> 24)) >>> 4).toString(10));
// //
// // // console.log((~0 << 28).toString(2));
// // // console.log(((~0 << 28) >>> 28).toString(2));
// // // console.log((((~0 << 28) >>> 24) >>> 4).toString(2));
// // console.log((((2 << 8) | (9 << 4) | 7) & ((~0 << 28) >>> 20)).toString(2));
// // console.log(((((2 << 8) | (9 << 4) | 7) & ((~0 << 28) >>> 20)) >>> 8).toString(10));
//
// const numberOne = 1234567_2222222_3333333_4444444_5555555_6666666_9n;
//
// function generateBcdCodes(number: bigint) {
//   const arr = [];
//   let acc = 0;
//   let pointer = 0;
//   let remainderOfTheDivisionCounter = 0;
//   const totalNumberLength = String(number).length;
//
//   while (number > 0n) {
//     const digit = number % 10n;
//     acc |= Number(digit) << (pointer * 4);
//
//     pointer++;
//     remainderOfTheDivisionCounter++;
//     number = number / 10n;
//
//     const blockSplitCondition =
//       (totalNumberLength - remainderOfTheDivisionCounter) % 7 === 0;
//
//     if (blockSplitCondition) {
//       arr.unshift(acc);
//       acc = 0;
//       pointer = 0;
//     }
//   }
//
//   console.log(arr);
// }
//
// function valueOf(numBig: bigint): number[] {
//   const arrNums = [];
//   let num = numBig;
//   let bcd = 0;
//   let step = 0;
//   let count = 0;
//
//   while (num > 0) {
//     const digit = num % 10n;
//
//     if (!bcd) {
//       bcd = Number(digit) << step;
//     } else {
//       bcd = (Number(digit) << step) | bcd;
//     }
//
//     count++;
//
//     if (count % 7 === 0) {
//       arrNums.unshift(bcd);
//     }
//
//     step = step + 4;
//     num = num / 10n;
//   }
//
//   return arrNums;
// }
//
// generateBcdCodes(1234567n);
// generateBcdCodes(1234567_1231231_2312312n);
// console.log('-----------------------------------');
// console.log(valueOf(1234567n));
// console.log(valueOf(1234567_1231231_2312312n));
//

function binary(num: number) {
  return num.toString(2).padStart(32, '0');
}

function binaryNegative(num: number) {
  const str = new Uint32Array([num])[0].toString(2);
  return '0b' + str.padStart(32, '0').replace(/(.{4})(?!$)/g, '$1_');
}

function parseBinary(str: string) {
  return parseInt(str.replace(/^0b|_/g, ''), 2) >> 0;
}

const binNumber = (13 << 24) | (204 << 16) | (56 << 8) | 128;

function createMask(len: number, pos: number) {
  let r = ~0;
  // console.log(r);
  r <<= 32 - len;
  // console.log(r.toString(2));
  r >>>= 32 - pos;
  // console.log(r.toString(2));
  return r;
}

const num = createMask(8, 32);
//
console.log(binary((binNumber & num) >> 24));

console.log(binaryNegative(13));
console.log(binaryNegative(-13));

class BCD {
  private numbers: number[] = [];

  // Во избежание переполнение Double чисел на вход используем BigInt
  constructor(num: bigint) {
    let entryNumber = Number(num);
    let n = 0;

    while (entryNumber > 0) {
      n = +1;
      const digit = entryNumber % 10;
      this.numbers.push(digit);
      entryNumber = Math.floor(entryNumber / 10);
    }
  }

  // Во избежание переполнение Double чисел на выход используем BigInt
  // valueOf(): bigint {
  //   // ...
  // }
  //
  // // Возвращает разряд BCD числа по заданной позиции.
  // // Отрицательная позиция означает разряд "с конца".
  // get(pos: number): number {}
}

const n = new BCD(65536n);
