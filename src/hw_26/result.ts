interface IResult {}

class Result<D, E> implements IResult {
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

  then(cb: (data: D) => void) {
    if (this.state === 'ok') {
      cb(this.data);
    }

    return this;
  }

  catch(cbErr: (err: E) => void) {
    if (this.state === 'err') {
      cbErr(this.cause);
    }

    return this;
  }
}

const data = new Result(() => {
  throw 'er2r';
});

data
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.log(err);
  })
  .then(res => {
    console.log(res);
  });
