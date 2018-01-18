const express = require("express");
const responseMetrics = require("../index");

const app = express();

const testFunc = (req, res) => {
  if (req.headers["x-fail"]) {
    res.status(500).send();
    return;
  }
  res.send("great test");
};

app.use(
  responseMetrics({
    port: 8190
  })
);

app.get("/example/url", testFunc);
app.post("/example/url", testFunc);
app.get("/example/otherURL", testFunc);
app.post("/example/otherURL", testFunc);

let server = app.listen(3001);

module.exports = server;
