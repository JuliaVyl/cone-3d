import * as THREE from 'three';

/**
 * Класс для создания конуса в three.js
 *
 * @author Julia
 * @version 1.0.0
 */
export class ConeGenerator {
  occuracy = 3;
  minEdges = 3;
  maxEdges = 150;
  /**
   *
   * @param {number} h Высота конуса
   * @param {number} r Радиус конуса
   * @param {number} n Количество сегментов конуса
   * @constructor
   */
  constructor(h, r, n) {
    this.height = h < 1 ? 1 : n > 100 ? 100 : h;
    this.radius = r < 1 ? 1 : r > 100 ? 100 : r;
    this.segments =
      n < this.minEdges ? this.minEdges : n > this.maxEdges ? this.maxEdges : n;
  }
  /**
   * Возвращает координаты вершины конуса
   * @return {THREE.Vector3}
   */
  getTopVertice() {
    return new THREE.Vector3(0, this.height, 0);
  }
  /**
   * Возвращает готовую фигуру
   * @return {THREE.Geometry}
   */
  getGeometry() {
    const geometry = new THREE.Geometry();
    const bottomVertices = this.computeBottomVertices(
      this.segments,
      this.radius
    );
    const vertices3d = this.get3dVertices(bottomVertices);
    geometry.vertices.push(...vertices3d);
    const vertices2d = this.get2dVertices(bottomVertices);
    const segmentFaces = this.getSegmentFace(this.segments);
    const bottomFaces = this.getBottomFace(vertices2d);
    geometry.faces.push(...segmentFaces, ...bottomFaces);
    geometry.computeFaceNormals();
    return geometry;
  }
  /**
   * Возвращает массив с координатами основания конуса
   * @param {number} n Количество сегментов конуса
   * @param {number} r Радиус конуса
   * @return {number[][]}
   */
  computeBottomVertices(n, r) {
    const vertices = [];
    for (let i = 0; i < n; i++) {
      const x = r * Math.cos((2 * Math.PI * i) / n);
      const y = r * Math.sin((2 * Math.PI * i) / n);
      vertices.push([+x.toFixed(this.occuracy), +y.toFixed(this.occuracy)]);
    }
    return vertices;
  }
  /**
   * Возвращает массив с трехмерными координатами основания конуса
   * @param {number[][]} arr Массив с 3d координатами основания конуса
   * @return {THREE.Vector3[]}
   */
  get3dVertices(arr) {
    const vertices = [];
    for (let [x, y] of arr) {
      vertices.push(new THREE.Vector3(x, 0, y));
    }
    vertices.push(new THREE.Vector3(0, this.height, 0));
    return vertices;
  }
  /**
   * Возвращает массив с двухмерными координатами основания конуса
   * @param {number[][]} arr Массив с 2d координатами основания конуса
   * @return {THREE.Vector2[]}
   */
  get2dVertices(arr) {
    const vertices = [];
    for (let [x, y] of arr) {
      vertices.push(new THREE.Vector2(x, y));
    }
    return vertices;
  }
  /**
   * Возвращает Face основания конуса,
   * рассчитывается с помощью функции деления на треуголники
   *
   * @return { THREE.Face3[]}
   */
  getBottomFace(bottomVertices) {
    //
    const triangles = THREE.ShapeUtils.triangulateShape(bottomVertices, []);
    const bottomFaces = [];
    for (let i = 0; i < triangles.length; i++) {
      bottomFaces.push(
        new THREE.Face3(triangles[i][0], triangles[i][1], triangles[i][2])
      );
    }
    return bottomFaces;
  }

  /**
   * Получить массив face3 для сегментов конуса
   *
   * @param {numer} n количество сегментов
   * @return {Face3[]}
   */
  getSegmentFace(n) {
    const segmentFaces = [];
    for (let i = 0; i <= n; i++) {
      segmentFaces.push(new THREE.Face3((i + 1) % n, i, n));
    }
    return segmentFaces;
  }
}
