// #1

// function random(min: number, max: number) {
//   return {
//     [Symbol.iterator]() {
//       return this;
//     },
//
//     next() {
//       const randomNumber = Math.floor(Math.random() * (max - min) + min);
//
//       return {
//         value: randomNumber,
//         done: false,
//       };
//     },
//   };
// }

// const randomInt = random(0, 10);
// // console.log(randomInt.next());
// // console.log(randomInt.next());
// // console.log(randomInt.next());
// // console.log(randomInt.next());
//
// function take<T>(iter: IterableIterator<T>, count: number = 0) {
//   let i = 0;
//
//   return {
//     [Symbol.iterator]() {
//       return this;
//     },
//
//     next(): { value: number | undefined; done: boolean } {
//       if (i < count) {
//         const value = iter.next().value;
//         i++;
//
//         return {
//           value,
//           done: false,
//         };
//       } else {
//         return {
//           value: undefined,
//           done: true,
//         };
//       }
//     },
//   };
// }

// console.log([...take(randomInt, 15)]);

// function filter<T>(iter: IterableIterator<T>, pred: (el: T) => boolean) {
//   return {
//     [Symbol.iterator]() {
//       return this;
//     },
//
//     next(): { value: number | undefined; done: boolean } {
//       const value = iter.next().value;
//
//       if (!pred(value)) {
//         return this.next();
//       }
//
//       return { value, done: false };
//     },
//   };
// }

// filter(randomInt, el => el < 5);

// console.log([
//   ...take(
//     filter(randomInt, el => el < 8),
//     15,
//   ),
// ]);

// function enumerate<T>(iter: IterableIterator<T>) {
//   let i = 0;
//
//   return {
//     [Symbol.iterator]() {
//       return this;
//     },
//
//     next(): { value: [number, number] | undefined; done: boolean } {
//       const value = iter.next().value;
//
//       return { value: [i++, value], done: false };
//     },
//   };
// }

// console.log([...take(enumerate(randomInt), 3)]);

// class CustomRange {
//   readonly start: number | string;
//   readonly end: number | string;
//   private startCode: number;
//   private endCode: number;
//
//   constructor(start: string | number, end: string | number) {
//     this.start = start;
//     this.end = end;
//     this.startCode =
//       typeof this.start === 'string' ? this.start.charCodeAt(0) : this.start;
//     this.endCode = typeof this.end === 'string' ? this.end.charCodeAt(0) : this.end;
//     // this.endCode = this.end.charCodeAt(0);
//   }
//
//   [Symbol.iterator]() {
//     return this;
//   }
//
//   next() {
//     if (this.startCode <= this.endCode) {
//       return {
//         // value: String.fromCharCode(this.startCode++),
//         value:
//           typeof this.startCode === 'string'
//             ? String.fromCharCode(this.startCode++)
//             : this.startCode++,
//         done: false,
//       };
//     } else {
//       return {
//         value: undefined,
//         done: true,
//       };
//     }
//   }
//
//   reverse() {
//     return {
//       [Symbol.iterator]() {
//         return this;
//       },
//
//       next: () => {
//         if (this.endCode >= this.startCode) {
//           return {
//             value:
//               typeof this.endCode === 'string'
//                 ? String.fromCharCode(this.endCode--)
//                 : this.endCode--,
//             done: false,
//           };
//         } else {
//           return {
//             value: undefined,
//             done: true,
//           };
//         }
//       },
//     };
//   }
// }

// const symbolRange = new CustomRange('a', 'j');
// const symbolRange = new CustomRange(-5, 1);
//
// console.log([...symbolRange.reverse()]);
// console.log([...symbolRange.reverse()]);

// function seq(...iters: (Array<number | string> | Set<number | string> | string)[]) {
//   const getIters = iters.map(el => el[Symbol.iterator]());
//   let i = 0;
//
//   return {
//     [Symbol.iterator]() {
//       return this;
//     },
//
//     next():
//       | { value: string | number | undefined; done: boolean }
//       | IteratorYieldResult<number | string | undefined>
//       | IteratorYieldResult<string> {
//       while (i < getIters.length) {
//         const iter = getIters[i].next();
//
//         if (iter.done) {
//           i++;
//         } else {
//           return iter;
//         }
//       }
//
//       return { value: undefined, done: true };
//     },
//   };
// }
//
// console.log(...seq([1, 2], new Set([3, 4]), 'bla'));
// console.log(seq([1, 2], new Set([3, 4]), 'bla'));

// function zip(...iters: (Array<number | string> | Set<number | string> | string)[]) {
//   const getIter = iters.map(iter => iter[Symbol.iterator]());
//
//   let j = 0;
//
//   return {
//     [Symbol.iterator]() {
//       return this;
//     },
//
//     next() {
//       let i = 0;
//       const arr: (string | number)[] = [];
//
//       if (j === getIter.length) {
//         return {
//           value: undefined,
//           done: true,
//         };
//       }
//
//       while (i < getIter.length) {
//         const iter = getIter[i++].next();
//
//         if (iter.done) {
//           return {
//             value: undefined,
//             done: true,
//           };
//         }
//
//         arr.push(iter.value);
//       }
//
//       j++;
//
//       return {
//         value: arr,
//         done: false,
//       };
//     },
//   };
// }
//
// console.log(...zip([1, 2, 8], new Set([3, 4, 9]), 'bla'));

function mapSeq(
  iterObj: Array<number | string> | Set<number | string> | string,
  itersFunc: ((el: number) => number)[],
) {
  const iters = iterObj[Symbol.iterator]();

  return {
    [Symbol.iterator]() {
      return this;
    },

    next() {
      const getItersFunc = itersFunc[Symbol.iterator]();
      const iterValue = iters.next();
      const iterFunc = getItersFunc;
      let curr = iterFunc.next();
      let value = iterValue.value;

      if (iterValue.done) {
        return {
          done: true,
          value: undefined,
        };
      }

      while (!curr.done) {
        value = curr.value(value);
        curr = iterFunc.next();
      }

      curr = itersFunc[Symbol.iterator]().next();

      return {
        value,
        done: false,
      };
    },
  };
}

console.log(...mapSeq([1, 2, 3, 10], [el => el * 2, el => el - 1]));
