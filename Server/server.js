const express = require('express');
const { computeVerticesAndTriangles } = require('./ConeGenerator.js');
const cors = require('cors');
const errorhandler = require('errorhandler');
const path = require('path');

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

app.use(express.static(path.resolve(__dirname, 'build')));
app.use(express.json());
app.use(errorhandler());
app.use(cors());

app.post('/cone', addConeParams);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 5000, function () {
  console.log('Server has been started on *:5000');
});
