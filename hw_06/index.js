class Link {
    next = null;
    prev = null;
    value;

    constructor(value) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}


class LinkList {
    first = null;
    last = null;

    isEmpty() {
        return this.first === null;
    }

    push(value) {
        const newLink = new Link(value);

        if (this.isEmpty()) {
            this.first = newLink;
        } else {
            this.last.next = newLink;
        }

        const tempPrev = this.last;
        this.last = newLink;
        newLink.prev = tempPrev;
    }

    unshift(value) {
        const newLink = new Link(value);

        if (this.isEmpty()) {
            this.last = newLink;
        } else {
            newLink.next = this.first;
        }

        this.first = newLink;
    }

    deleteFirst() {
        if (this.isEmpty()) {
            console.log('Empty list!!!');
            return;
        }
        this.first = this.first.next;
    }

    display() {
        let current = this.first;
        while (current) {
            console.log(current);
            current = current.next;
        }
    }

    [Symbol.iterator]() {
        let cursor = this.first;

        return {
            next() {
                const currentCursor = cursor;
                cursor = cursor?.next;

                return {value: currentCursor, done: currentCursor === null}
            }
        }
    }
}

const linkedList = new LinkList();

linkedList.push(2);
linkedList.push(3);
linkedList.push(4);
// linkedList.unshift(1);

for (const link of linkedList) {
    console.log(link);
}


