const fs = require("fs");
const express = require("express");

const app = express();
const port = 8080;

const data = fs.readFileSync(`../Utils/db.json`, "utf-8");
const dataObj = JSON.parse(data);
const list = dataObj["newsList"];

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.get("/length", (req, res) => {
  res.json({ len: list.length });
});

app.get("/:offset/:size", (req, res) => {
  const result = list.slice(
    req.params.offset,
    Number(req.params.offset) + Number(req.params.size)
  );
  console.log(Number(req.params.offset) + "hello" + Number(req.params.size));
  res.json({ list: result });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
