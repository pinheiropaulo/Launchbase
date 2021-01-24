const express = require("express");
const nunjucks = require("nunjucks");

const routes = require("./routes");

const server = express();
const port = 8080;

server.use(express.static("public"));
server.use(routes);

server.set("view engine", "njk");

nunjucks.configure("views", {
  express: server,
  autoescape: false,
  noCache: true,
});

server.listen(port, () => {
  console.log(`Server is running http://localhost:${port}`);
});
