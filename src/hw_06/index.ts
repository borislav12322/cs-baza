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
      if (this.last) {
        this.last.next = newLink;
      }
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

      if (this.first) {
        this.first.prev = newLink;
      }
    }

    this.first = newLink;
  }

  deleteFirst() {
    if (this.isEmpty()) {
      return;
    }

    const temp = this.first;

    if (this.first && this.first.next === null) {
      this.last = null;
    } else {
      if (this.first && this.first.next) {
        this.first.next.prev = null;
      }
    }

    if (this.first) {
      this.first = this.first?.next;
    }

    return temp;
  }

  deleteLast() {
    if (this.isEmpty()) {
      return;
    }

    const temp = this.last;

    if (this.last && this.last.prev === null) {
      this.first = null;
    } else {
      if (this.last && this.last.prev) {
        this.last.prev.next = null;
      }
    }

    if (this.last) {
      this.last = this.last.prev;
    }

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

        if (cursor) {
          cursor = cursor.next;
        }

        return { value: currentCursor, done: currentCursor === null };
      },
    };
  }
}

const linkedList = new LinkList();

linkedList.push(5);
linkedList.push(20);
linkedList.push(10);
linkedList.push(1);
linkedList.push(8);

for (const el of linkedList) {
  console.log(el?.value);
}
