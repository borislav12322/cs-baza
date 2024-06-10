const stringOne =
  'какая-то строка 123.121223 еще какая9121399.3431213-то строка 123 999.3431213 число.12321.внутри1231.строки 999.123123';

function getNumbersIterator(str: string) {
  const reqEx = /\d+\.\d+/g;
  let strIter = str.matchAll(reqEx);

  return {
    [Symbol.iterator]() {
      return this;
    },

    next(value?: string) {
      while (true) {
        const iter = strIter.next();

        if (iter.done) {
          if (value) {
            strIter = value.matchAll(reqEx);
          }

          return {
            done: false,
            value: 'waiting for new string',
          };
        } else {
          return {
            value: iter.value[0],
            done: false,
          };
        }
      }
    },
  };
}

const numbers = getNumbersIterator(stringOne);

console.log(numbers.next());
console.log(numbers.next());
console.log(numbers.next());
console.log(numbers.next());
console.log(numbers.next());
console.log(numbers.next('123123.12312312'));
console.log(numbers.next());
console.log(numbers.next());
console.log(numbers.next());
console.log(numbers.next());
console.log(numbers.next());
console.log(numbers.next());
console.log(numbers.next());
console.log(numbers.next());

// console.log(...numbers);
