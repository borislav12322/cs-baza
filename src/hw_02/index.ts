const instructions = {
  'SET A': 0,
  'PRINT A': 1,
  'IFN A': 2,
  RET: 3,
  'DEC A': 4,
  JMP: 5,
};

const program = [
  // Ставим значения аккумулятора
  instructions['SET A'],
  // В 10
  10,
  // Выводим значение на экран
  instructions['PRINT A'],
  // Если A равно 0
  instructions['IFN A'],
  // Программа завершается
  instructions['RET'],
  // И возвращает 0
  0,
  // Уменьшаем A на 1
  instructions['DEC A'],
  // Устанавливаем курсор выполняемой инструкции
  instructions['JMP'],
  // В значение 2
  2,
];

function execute(programList: number[]) {
  const getCommand = (key: 'SET A' | 'PRINT A' | 'IFN A' | 'RET' | 'DEC A' | 'JMP') =>
    instructions[key];

  const index = 0;
  const currentCursor = programList[index];

  while (true) {
    switch (currentCursor) {
      case instructions['SET A']:
        break;
      default:
        break;
    }
  }
}

// execute(program);

// console.log(Object.is('123', '321'));
// console.log(Object.is('123', '123'));

const reorder = (word: string) =>
  word
    .split('')
    .sort((a, b) => a.localeCompare(b))
    .join('');

const groupWords = (words: string[], map: Map<string, string[]>) => {
  for (const word of words) {
    const sorted = reorder(word);
    const values = map.get(sorted) || [];

    values.push(word);
    map.set(sorted, values);
  }
};

const groupAnagram = (words: string[]) => {
  const map = new Map();

  groupWords(words, map);

  return [...map.values()];
};

// console.log(groupAnagram(['eat', 'tea', 'tan', 'ate', 'nat', 'bat']));

const topFrequent = (numbers: number[], k: number) => {
  const map = new Map();

  for (const num of numbers) {
    const count = (map.get(num) || 0) + 1;

    map.set(num, count);
  }

  const sorted = [...map.entries()].sort((a, b) => b[1] - a[1]);

  const result = [];

  for (let i = 0; i < k; i++) {
    result.push(sorted[i][0]);
  }

  return result;
};

// console.log(topFrequent([1, 1, 1, 2, 2, 3], 2));

const multExcept = (nums: number[]) => {
  const map = new Map();
  const res = [];

  for (let i = 0; i < nums.length; i++) {
    map.set(nums[i], []);
    for (let j = 0; j < nums.length; j++) {
      if (i === j) {
        continue;
      }

      map.get(nums[i]).push(nums[j]);
    }

    if (map.get(nums[i]).length > 0) {
      res.push(map.get(nums[i]).reduce((acc: number, curr: number) => acc * curr, 1));
    } else {
      res.push(0);
    }
  }

  console.log(map);
  console.log(res);
  return res;
};

// multExcept([1, 2, 3, 4]);
// multExcept([0, 0]);
// multExcept([1, 1]);

// console.log((-4).toString(2));
// console.log((-4 >>> 2).toString(2));
//
// console.log((0b110101011011 >>> 2).toString(2));
// console.log((0b110101011011 >>> 2).toString(10));

const a = 56;
const b = 13;
const c = 128;
const d = 204;
const num = (a << 24) | (b << 16) | (c << 8) | d;

console.log(num.toString(2));
console.log((num & 0b00000000000000000000000011111111) >>> 0);
console.log((num & 0b00000000000000001111111100000000) >>> 8);
console.log((num & 0b00000000111111110000000000000000) >>> 16);
console.log((num & 0b11111111000000000000000000000000) >>> 24);
