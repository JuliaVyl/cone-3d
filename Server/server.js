const express = require("express");
const { computeVerticesAndTriangles } = require("./ConeGenerator.js");

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

app.post("/cone", addConeParams);

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(3000, () => {
  console.log("Server has started");
});
