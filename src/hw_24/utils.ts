export function convertToIterable(iter: Iterator<string>) {
  function getIterable() {
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

  return [...getIterable()].join('');
}
