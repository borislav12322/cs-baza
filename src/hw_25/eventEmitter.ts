type TEvent = (...args: any[]) => void;

class EventEmitter {
  private storage: Map<string, Set<TEvent>> = new Map();

  private getEvent(eventName: string) {
    if (!this.storage.has(eventName)) {
      this.storage.set(eventName, new Set());
    }

    return this.storage.get(eventName);
  }

  private setEvent(eventName: string, event: TEvent) {
    this.getEvent(eventName)?.add(event);
  }

  public on(eventName: string, event: TEvent) {
    this.setEvent(eventName, event);
  }

  public once(eventName: string, event: TEvent) {
    const context = this;

    this.on(eventName, function cb(...args) {
      try {
        event(...args);
      } finally {
        context.off(eventName, cb);
      }
    });
  }

  public emit(eventName: string, ...data: any[]) {
    const events = this.getEvent(eventName);

    events?.forEach(el => {
      el(...data);
    });
  }

  public off(eventName?: string, event?: TEvent) {
    if (eventName && !event) {
      this.getEvent(eventName)?.clear();
      return;
    }
    if (eventName && event) {
      this.getEvent(eventName)?.delete(event);
      return;
    }

    this.storage.clear();
  }
}

const ee = new EventEmitter();

ee.on('foo', console.log); // Сработает только один раз

ee.emit('foo', 1);
ee.emit('foo', 2);

ee.off('foo', console.log); // Отмена конкретного обработчика события по ссылке
ee.off('foo'); // Отмена всех обработчиков этого события

const sum = (a: number, b: number) => {
  console.log(a + b);
};

const divide = (a: number, b: number) => {
  console.log(a / b);
};

ee.on('bla', sum);
ee.on('bla', divide);

ee.emit('bla', 5, 10);

ee.off('bla', sum);

ee.emit('bla', 20, 10);
