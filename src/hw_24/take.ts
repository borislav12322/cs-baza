import { Parser, ParserResult, ParserToken } from './types';
import { convertToIterable } from './utils';

function getRules(rule: RegExp | ((value: string) => boolean), value: string) {
  if (typeof rule === 'function') {
    return rule(value);
  } else {
    return rule.test(value);
  }
}

export function take<R>(
  rule: RegExp | ((value: string) => boolean),
  params: { min?: number; max?: number } = { min: 0, max: Infinity },
): Parser {
  return function* (
    str: Iterable<string>,
  ): Generator<ParserToken<string>, ParserResult<R>, Iterable<string> | undefined> {
    const iter = str[Symbol.iterator]();
    let result = '';
    let i = 0;

    while (true) {
      if (i >= params.max) {
        break;
      }

      const current = iter.next();

      if (current.done) {
        break;
      }

      const isValid = getRules(rule, current.value);

      if (isValid) {
        result = result + current.value;
        i = i + 1;
      }
    }

    if (result === '' || (params.min && i < params.min)) {
      throw new Error('Value not matched');
    }

    return [{ type: 'TAKE', value: result }, convertToIterable(iter)];
  };
}

// const fn = take(/\d/, { min: 2, max: 3 })('1234 foo');
// console.log(fn.next());
