const fs = require("fs");
const express = require("express");

const app = express();
const port = 8080;

const data = fs.readFileSync(`../Utils/db.json`, "utf-8");
const dataObj = JSON.parse(data);
const list = dataObj["newsList"];
let offset = 0;
const size = 8;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.get("/length", (req, res) => {
  console.log(list.length);
  // console.log(req);
  // console.log();
  res.json("len: length");
});

app.get("/", (req, res) => {
  const result = list.slice(offset, offset + size);
  offset = offset + 8;

  res.send(result);
});

// 500 internal server error handler
app.use((err, _req, res, next) => {
  if (err.statusCode === 400) {
    return next(err);
  }

  return res.status(500).json({
    data: null,
    err: process.env === "production" ? null : err,
    msg: process.env === "production" ? "Error!" : "500 Internal Server Error",
  });
});

// 400 error handler
app.use((err, _req, res, next) => {
  if (err.statusCode === 404) {
    return next();
  }

  return res.status(400).json({
    data: null,
    err: process.env === "production" ? null : err,
    msg: "400 Bad Request",
  });
});

// 404 error handler
app.use((_req, res) =>
  res.status(404).json({
    data: null,
    status: "Error",
    msg: "Error 404: We can not find what you are looking for",
  })
);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
