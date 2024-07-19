interface IMonade<D> {
  data: D;
  then<R>(fn: (arg: D) => IMonade<R>): IMonade<R>;
}

interface IResult {}

class ResultMonade<D, E> implements IResult {
  state: 'ok' | 'err';
  data: D;
  cause: E;

  constructor(cb: () => D) {
    try {
      this.state = 'ok';
      this.data = cb();
    } catch (e) {
      this.state = 'err';
      this.cause = e;
    }
  }

  static resolve<T, E>(data: ResultMonade<T, E> | T) {
    if (data instanceof ResultMonade) {
      return data;
    }

    return new ResultMonade<T, E>(() => data);
  }

  then<T>(cb: (data: D) => ResultMonade<T, E> | T): ResultMonade<T, E> {
    return new ResultMonade<T, E>(() => ResultMonade.resolve(cb(this.data)).data);
  }

  catch(cbErr: (err: E) => void) {
    if (this.state === 'err') {
      cbErr(this.cause);
    }

    return this;
  }
}

// const res1 = new ResultMonade(() => 1);

const res = new ResultMonade(() => 12 + 18);

res
  .then(res => {
    // console.log(res);
    return res;
  })
  .then(res => {
    return new ResultMonade(() => 12 + res);
    // console.log(res + 112);
  })
  .then(res => {
    console.log(res);
  });
