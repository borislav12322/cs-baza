function waterfall(
  collection: Iterable<(...args: any[]) => void>,
  finalCb: (...args: any[]) => void,
) {
  const iters = collection[Symbol.iterator]();

  let currentArgs: any[] = [];

  const handler = (err: null | Error, ...args: any[]) => {
    if (err) {
      finalCb(err);
      return;
    }
    currentArgs = args;
    executor();
  };

  function executor() {
    const iter = iters.next();

    if (iter.done) {
      finalCb(null, ...currentArgs);
      return;
    }

    iter.value(...currentArgs, handler);
  }

  executor();
}

waterfall(
  [
    cb => {
      cb(null, 'one', 'two');
    },

    (arg1, arg2, cb) => {
      console.log(arg1); // one
      console.log(arg2); // two
      cb(null, 'three');
    },

    (arg1, cb) => {
      console.log(arg1); // three
      cb(null, 'done');
    },
  ],
  (err, result) => {
    console.log(result); // done
  },
);

waterfall(
  new Set([
    cb => {
      cb('ha-ha!');
    },

    (arg1, cb) => {
      cb(null, 'done');
    },
  ]),
  (err, result) => {
    console.log(err); // ha-ha!
    console.log(result); // undefined
  },
);
