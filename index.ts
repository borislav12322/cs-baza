function seq(itersObj: Iterable<any>, itersFuncs: Iterable<any>) {
  const getIterObj = itersObj[Symbol.iterator]();

  return {
    [Symbol.iterator]() {
      return this;
    },

    next() {
      const value = getIterObj.next();
      let res = value.value;

      if (value.done) {
        return {
          value: undefined,
          done: true,
        };
      }

      for (const el of itersFuncs) {
        res = el(res);
      }

      return {
        value: res,
        done: false,
      };
    },
  };
}
