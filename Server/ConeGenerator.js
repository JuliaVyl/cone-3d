/**
 * Функция для создания вершин основания конуса в three.js
 *
 * @author Julia
 * @version 1.0.0
 */

THREE = require("three");

const occuracy = 3;

function computeVerticesAndTriangles(n, r) {
  const vertices = [];
  for (let i = 0; i < n; i++) {
    const x = r * Math.cos((2 * Math.PI * i) / n);
    const y = r * Math.sin((2 * Math.PI * i) / n);
    vertices.push([+x.toFixed(occuracy), +y.toFixed(occuracy)]);
  }

  const vertices2d = [];
  for (let [x, y] of vertices) {
    vertices2d.push(new THREE.Vector2(x, y));
  }

  const triangles = THREE.ShapeUtils.triangulateShape(vertices2d, []);
  return [vertices, triangles];
}

module.exports = {
  computeVerticesAndTriangles,
};
