import { Parser, ParserResult, ParserToken } from './types';
import { tag } from './tag';
import { take } from './take';
import { convertToIterable } from './utils';

function seq<R>(...parsers: Parser[]): Parser {
  return function* (
    str: Iterable<string>,
  ): Generator<ParserToken<string>, ParserResult<R>, Iterable<string> | undefined> {
    let current: Iterable<string> = str;
    let result = '';
    const parsersIter = [...parsers][Symbol.iterator]();
    for (const char of parsersIter) {
      const { value } = char(current).next();
      result = result + value[0].value;
      current = value[1];
    }

    return [{ value: result, type: 'SEQ' }, current];
  };
}

const fnExpr = seq(
  tag('function '),
  take(/[a-z_$]/i, { max: 3 }),
  tag('()'),
  take(/ /, { min: 1 }),
)('function foo() {}');

console.log(fnExpr.next()); // {done: true, value: {type: 'SEQ', value: 'function foo()'}}
// console.log(fnExpr.next()); // {done: true, value: {type: 'SEQ', value: 'function foo()'}}
