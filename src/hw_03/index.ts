function* fizzBuzz() {
  let i = 1n;
  while (i <= 100n) {
    switch (true) {
      case i % 5n === 0n && i % 3n === 0n:
        yield 'FizzBuzz';
        break;
      case i % 3n === 0n:
        yield 'Fizz';
        break;
      case i % 5n === 0n:
        yield 'Buzz';
        break;
      default:
        yield i;
    }

    i++;
  }
}

const fizzBuzzInstance = fizzBuzz();
