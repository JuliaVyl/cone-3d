const express = require('express');
const { computeVerticesAndTriangles } = require('./ConeGenerator.js');
const cors = require('cors');
const errorhandler = require('errorhandler');

function addConeParams(req, res) {
  const radius = +req.body.radius;
  const segments = +req.body.segments;
  const coordinates = computeVerticesAndTriangles(segments, radius);
  res.json({
    edges: coordinates[0],
    bottomTriangles: coordinates[1],
  });
}

let app = express();

app.use(express.json());
app.use(errorhandler());
app.use(cors());

app.post('/cone', addConeParams);

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.listen(5000, () => {
  console.log('Server has started');
});
