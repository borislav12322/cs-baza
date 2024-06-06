// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
function* getNumbers(str: string) {
  const iter = str[Symbol.iterator]();
  let num = '';

  while (true) {
    const it = iter.next();

    if (it.done) {
      if (!Number.isInteger(Number(num))) {
        num = yield num;
        return getNumbers(str).next(num);
      }

      break;
      // throw new Error('Waiting for new string');
    } else {
      if (!isNaN(Number(it.value)) || it.value === '.') {
        if (it.value !== '') {
          num = num + it.value;
        }
      }
      if (it.value === ' ' && !isNaN(Number(num))) {
        if (!Number.isInteger(Number(num))) {
          yield num;
        }
        num = '';
      }
    }
  }
}

const str =
  'какая-то строка 123.121223 еще какая9121399.3431213-то строка 123 999.3431213 число.12321.внутри1231.строки 999.123123';

function* getNumbersTwo(str: string) {
  const reqEx = /\d+\.\d+/g;
  const strIter = str.matchAll(reqEx);
  let state = 0;

  while (state === 0) {
    try {
      for (const char of strIter) {
        yield char;
      }

      state = 1;
      throw new Error('err11');
    } catch (e) {
      console.log(e);
      console.log('123');
    }
  }
}

const nums = getNumbersTwo(str);

try {
  console.log(...nums);
} catch (e) {
  console.log(e);
}
