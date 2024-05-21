// #1

// const customRegEx = (value: string) => {
//   const myRegExp = /^[a-z0-9_$]+$/gi;
//
//   return myRegExp.test(value);
// };
//
// console.log(customRegEx('привефтq'));
// console.log(customRegEx('qweqqwe'));
// console.log(customRegEx('qqqeqwe_$'));
// console.log(customRegEx(''));

// #2

// const myRegExp = /^\d+,|;\d+,/gi;
// const myRegExp2 = /,[\d,]+;/g;
// // const myRegExp2 = //g;
// const str = '762120,0,22;763827,0,50;750842,0,36;749909,0,95;755884,0,41;';
//
// // console.log(str.match(myRegExp));
//
// console.log(str.split(myRegExp2));
// // ['762120', '763827', '750842', '749909', '755884']

// #3

// const myRegExp = new RegExp('("[a-z]"): ("\\d+"|\\d)', 'gi');

// [['"a": 1', 'a', '1'], ['"b": "2"', 'b', '"2"']]
// console.log([...'{"a": 1, "b": "2"}'.matchAll(myRegExp)]);
// console.log([...'{"a": 1, "b": "2"}'.matchAll(myRegExp)][0][1]);
// console.log([...'{"a": 1, "b": "2"}'.matchAll(myRegExp)][0][2]);
// console.log([...'{"a": 1, "b": "2"}'.matchAll(myRegExp)][0][3]);

// const str = '{"a": 1, "b": "2"}'.matchAll(myRegExp);

// #4
function format(string: string, obj: { user: string; age: number }) {
  // console.log(string.match(/\$\{\w+}/gi));

  return string.replace(/\$\{(\w+)}/gi, (_: string, args: string) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return obj[args];
  });
}

format('Hello, ${user}! Your age is ${age}.', { user: 'Bob', age: 10 });

// #5

// Нахождение арифметических операций в строке и замена на результат
// calc(`
// Какой-то текст (10 + 15 - 24) ** 2
// Еще какой-то текст 2 * 10
// `) == `
// Какой-то текст 1
// Еще какой-то текст 20
// `

function calc(str: string) {
  const urav = str.replace(/[^0-9()\-+*/\n]/g, '');
  urav.split(/[\n\s]/).forEach(el => {
    console.log(eval(el));
  });
  return str;
}

calc('Какойто текст (10 + 15 - 24) ** 2\n' + 'Еще какой то текст 2 * 10\n' + '`');
