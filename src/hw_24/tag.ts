import { ParserResult, ParserToken, ParserValue, Parser } from './types';

export function tag<R>(str: Iterable<string>): Parser {
  return function* (
    iterable: Iterable<string>,
    prev?: ParserValue,
  ): Generator<ParserToken<string>, ParserResult<R>, Iterable<string> | undefined> {
    const iter = iterable[Symbol.iterator]();


    for (const char of str) {
      const iterator = iter.next();

      if (char !== iterator.value) {
        throw new Error('Not match pattern');
      }
    }

    function convertToIterable() {
      return {
        [Symbol.iterator]() {
          return this;
        },
        next: () => {
          const newIter = iter.next();

          if (!newIter.done) {
            return {
              done: false,
              value: newIter.value,
            };
          }

          return {
            done: true,
            value: undefined,
          };
        },
      };
    }

    const iterableForNext = [...convertToIterable()].join('');

    return [{ type: 'TAG', value: str }, iterableForNext];
  };
}

// const fnTag = tag('function')('function foo() {}');
// console.log(fnTag.next());
