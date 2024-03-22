export class Link {
  next: Link | null = null;
  prev: Link | null = null;
  value: number;

  constructor(value: number) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

export class LinkList {
  first: Link | null = null;
  last: Link | null = null;

  isEmpty() {
    return this.first === null;
  }

  push(value: number) {
    const newLink = new Link(value);

    if (this.isEmpty()) {
      this.first = newLink;
    } else {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      this.last.next = newLink;
    }

    const tempPrev = this.last;
    this.last = newLink;
    newLink.prev = tempPrev;
  }

  unshift(value: number) {
    const newLink = new Link(value);

    if (this.isEmpty()) {
      this.last = newLink;
    } else {
      newLink.next = this.first;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      this.first.prev = newLink;
    }

    this.first = newLink;
  }

  deleteFirst() {
    if (this.isEmpty()) {
      return;
    }

    const temp = this.first;

    if (this.first?.next === null) {
      this.last = null;
    } else {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      this.first.next.prev = null;
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    this.first = this.first?.next;

    return temp;
  }

  deleteLast() {
    if (this.isEmpty()) {
      return;
    }

    const temp = this.last;

    if (this.last?.prev === null) {
      this.first = null;
    } else {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      this.last.prev.next = null;
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    this.last = this.last?.prev;

    return temp;
  }

  display() {
    let current = this.first;
    const res = [];
    while (current) {
      res.push(current?.value);
      current = current.next;
    }

    return res;
  }

  [Symbol.iterator]() {
    let cursor = this.first;

    return {
      next() {
        const currentCursor = cursor;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        cursor = cursor?.next;

        return { value: currentCursor, done: currentCursor === null };
      },
    };
  }
}

const linkedList = new LinkList();

linkedList.unshift(3);
linkedList.unshift(2);
linkedList.unshift(1);