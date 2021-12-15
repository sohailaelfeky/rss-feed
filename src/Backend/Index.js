const fs = require("fs");
const http = require("http");
const url = require("url");

const data = fs.readFileSync(`../Utils/db.json`, "utf-8");
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const pathName = req.url;
  const query = url.parse(req.url, true).query;
  console.log(query);
  console.log(pathName);

  if (pathName === `/?page=${query.page}`) {
    res.writeHead(200, {
      "Content-Type": "text/html",
      "Access-Control-Allow-Origin": "*",
    });

    res.end(data);
  } else res.writeHead(404);
});

server.listen(8080, "127.0.0.1", () => {
  console.log("listening");
});
