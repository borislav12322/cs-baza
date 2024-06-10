const str =
  'какая-то строка 123.121223 еще какая9121399.3431213-то строка 123 999.3431213 число.12321.внутри1231.строки 999.123123';

function* getNumbersGenerator(str: string): Generator<string> {
  const reqEx = /\d+\.\d+/g;
  let strIter = str.matchAll(reqEx);

  while (true) {
    const iter = strIter.next();

    if (iter.done) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const newString: string = yield 'waiting for new string';

      if (newString) {
        strIter = newString.matchAll(reqEx);
      }
    } else {
      if (iter.value[0]) {
        yield iter?.value?.[0];
      }
    }
  }
}

const nums = getNumbersGenerator(str);

console.log(nums.next());
console.log(nums.next());
console.log(nums.next());
console.log(nums.next());
console.log(nums.next());
console.log(nums.next());
console.log(nums.next());
console.log(nums.next());
console.log(nums.next());
console.log(nums.next());
console.log(nums.next());
console.log(nums.next('2222.1111 qweqwads123123.903471274'));
console.log(nums.next());
console.log(nums.next());
console.log(nums.next());
console.log(nums.next('123123123.1231231212'));
console.log(nums.next());
