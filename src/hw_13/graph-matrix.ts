import { TArrayConstructor, TypedArray } from '../hw_09/types';

class Matrix {
  arrayType: TArrayConstructor;
  dimensions: number[];
  size: number = 0;
  data: TypedArray;

  constructor(arrayType: TArrayConstructor, ...dimensions: number[]) {
    if (dimensions.length === 0) {
      throw new Error('Matrix must have at least one dimension');
    }

    this.arrayType = arrayType;
    this.dimensions = dimensions;
    this.size = this.calcSize(dimensions);
    this.data = new arrayType(this.size);
  }

  calcSize(dimensions: number[]) {
    let size = 1;
    for (const dim of dimensions) {
      size *= dim;
    }
    return size;
  }

  getIndex(...indices: number[]) {
    if (indices.length !== this.dimensions.length) {
      throw new Error('Number of indices must match number of dimensions');
    }

    let index = 0;
    for (let i = 0; i < indices.length; i++) {
      if (indices[i] < 0 || indices[i] >= this.dimensions[i]) {
        throw new Error(`Index ${indices[i]} is out of bounds for dimension ${i}`);
      }
      index = index * this.dimensions[i] + indices[i];
    }
    return index;
  }

  set(...indicesAndValue: number[]) {
    const value = indicesAndValue.pop();
    const index = this.getIndex(...indicesAndValue);

    if (typeof value === 'number') {
      this.data[index] = value;
    }
  }

  get(...indices: number[]) {
    const index = this.getIndex(...indices);
    return this.data[index];
  }
}

class Vertex {
  public label;
  public wasVisited;
  constructor(lab: string) {
    this.label = lab;
    this.wasVisited = false;
  }
}

class Graph {
  count: number = 0;
  currentVentsCount: number = 0;
  vertexList: Vertex[] = [];
  adjMat: Matrix;

  constructor(matrix: Matrix) {
    this.adjMat = matrix;
    this.count = Math.sqrt(this.adjMat.size);
  }

  addVertex(value: string) {
    this.vertexList[this.currentVentsCount++] = new Vertex(value);
  }

  createEdge(start: number, end: number) {
    this.adjMat.set(start, end, 1);
    this.adjMat.set(end, start, 1);
  }
}

const matrix = new Matrix(Uint8Array, 3, 3);

const graph = new Graph(matrix);
graph.addVertex('A');
graph.addVertex('B');

graph.createEdge(0, 1);

console.log(graph.adjMat);
