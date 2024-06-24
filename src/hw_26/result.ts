class Result<D, E> {
  private state: 'success' | 'error';
  private data: D;
  private cause: E;

  constructor(fn: Function, state?: 'success' | 'error') {
    this.state = state;

    try {
      fn();
      this.state = 'success';
    } catch (e) {
      console.log(e);
      this.state = 'error';
      this.cause = e;
    }
    if (this.state === 'success') {
      this.data = fn();
      this.state = 'success';
    }
  }

  static Success(data: Function) {
    return new Result(data, 'success');
  }
  static Reject(data: Function) {
    return new Result(data, 'error');
  }

  then(fn: (data: D) => void) {
    if (this.state === 'success') {
      fn(this.data);
    }

    return this;
  }

  catch(errFn: (err: E) => void) {
    if (this.state === 'error') {
      errFn(this.cause);
    }

    return this;
  }
}

Result.Success(() => 12 + 12)
  .then(res => {
    console.log(res);
  })
  .then(res => {
    console.log(res);
  });
