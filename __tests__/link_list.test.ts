import { LinkList } from '../src/hw_06';

describe('link_list', () => {
  it('should push three elements', () => {
    const linkList = new LinkList();
    linkList.push(1);
    linkList.push(2);
    linkList.push(3);

    expect(linkList?.last?.value).toEqual(3);
    expect(linkList?.first?.value).toEqual(1);
    expect(linkList?.first?.next?.prev?.value).toEqual(1);
    expect(linkList?.first?.next?.value).toEqual(2);
    expect(linkList?.last?.next).toEqual(null);
    expect(linkList?.last?.prev?.value).toEqual(2);
  });

  it('should unshift three elements', () => {
    const linkList = new LinkList();
    linkList.unshift(3);
    linkList.unshift(2);
    linkList.unshift(1);

    expect(linkList?.last?.value).toEqual(3);
    expect(linkList?.first?.value).toEqual(1);
    expect(linkList?.first?.next?.prev?.value).toEqual(1);
    expect(linkList?.first?.next?.value).toEqual(2);
    expect(linkList?.last?.next).toEqual(null);
    expect(linkList?.last?.prev?.value).toEqual(2);
  });

  it('should push one element', () => {
    const linkList = new LinkList();

    linkList.push(1);

    expect(linkList?.last?.value).toEqual(1);
    expect(linkList?.first?.value).toEqual(1);
    expect(linkList?.first?.prev).toEqual(null);
    expect(linkList?.first?.next).toEqual(null);
  });

  it('should unshift one element', () => {
    const linkList = new LinkList();

    linkList.unshift(1);

    expect(linkList?.last?.value).toEqual(1);
    expect(linkList?.first?.value).toEqual(1);
    expect(linkList?.first?.prev).toEqual(null);
    expect(linkList?.first?.next).toEqual(null);
  });

  it('should push 2 elements and unshift 1', () => {
    const linkList = new LinkList();
    linkList.push(2);
    linkList.push(3);
    linkList.unshift(1);

    expect(linkList?.last?.value).toEqual(3);
    expect(linkList?.first?.value).toEqual(1);
    expect(linkList?.first?.next?.prev?.value).toEqual(1);
    expect(linkList?.first?.next?.value).toEqual(2);
    expect(linkList?.last?.next).toEqual(null);
    expect(linkList?.last?.prev?.value).toEqual(2);
  });

  it('should unshift 2 elements and push 1', () => {
    const linkList = new LinkList();
    linkList.unshift(2);
    linkList.unshift(1);
    linkList.push(3);

    expect(linkList?.last?.value).toEqual(3);
    expect(linkList?.first?.value).toEqual(1);
    expect(linkList?.first?.next?.prev?.value).toEqual(1);
    expect(linkList?.first?.next?.value).toEqual(2);
    expect(linkList?.last?.next).toEqual(null);
    expect(linkList?.last?.prev?.value).toEqual(2);
  });

  it('should display array of values', () => {
    const linkList = new LinkList();

    linkList.push(3);
    linkList.push(4);
    linkList.unshift(2);
    linkList.unshift(1);

    expect(linkList.display()).toEqual([1, 2, 3, 4]);
  });

  it('should add tree elements and delete last element', () => {
    const linkList = new LinkList();

    linkList.push(2);
    linkList.push(3);
    linkList.unshift(1);

    expect(linkList.display()).toEqual([1, 2, 3]);

    linkList.deleteFirst();

    expect(linkList?.last?.value).toEqual(3);
    expect(linkList?.last?.next).toEqual(null);
    expect(linkList?.first?.value).toEqual(2);
    expect(linkList?.first?.value).not.toEqual(1);
    expect(linkList?.first?.next?.value).toEqual(3);
    expect(linkList?.first?.next?.prev?.value).toEqual(2);
  });

  it('should push one element and delete first element', () => {
    const linkList = new LinkList();

    linkList.push(1);
    const temp = linkList.deleteFirst();

    expect(temp?.value).toEqual(1);
    expect(linkList.first).toEqual(null);
    expect(linkList.last).toEqual(null);
  });

  it('should push one element and and delete last element', () => {
    const linkList = new LinkList();

    linkList.push(1);
    const temp = linkList.deleteLast();

    expect(temp?.value).toEqual(1);
    expect(linkList.first).toEqual(null);
    expect(linkList.last).toEqual(null);
  });

  it('should push three elements and delete two last elements', () => {
    const linkList = new LinkList();

    linkList.push(1);
    linkList.push(2);
    linkList.push(3);

    const tempOne = linkList.deleteLast();
    const tempTwo = linkList.deleteLast();

    expect(tempOne?.value).toEqual(3);
    expect(tempTwo?.value).toEqual(2);

    expect(linkList?.last?.value).toEqual(1);
    expect(linkList?.first?.value).toEqual(1);

    expect(linkList?.first?.next).toEqual(null);
    expect(linkList?.last?.next).toEqual(null);
  });
});
