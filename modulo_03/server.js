const express = require("express");
const nunjucks = require("nunjucks");

const videos = require("./data");

const server = express();
const port = 8080;

server.use(express.static("public"));

server.set("view engine", "njk");

nunjucks.configure("views", {
  express: server,
  autoescape: false,
  noCache: true,
});

server.get("/", (req, res) => {
  const about = {
    avatar_url:
      "https://avatars2.githubusercontent.com/u/6643122?s=400&u=1e9e1f04b76fb5374e6a041f5e41dce83f3b5d92&v=4",
    name: "Mayk Brito",
    role:
      "An instructor focused on helping people start programming for web - #html #css #javascript #sql #react #nodejs #fullstack",
    links: [{ name: "GitHub", url: "https://github.com/maykbrito" }],
  };

  return res.render("about", { about });
});

server.get("/classes", (req, res) => {
  return res.render("classes", { items: videos });
});

server.get("/video", (req, res) => {
  const id = req.query.id;

  const video = videos.find((video) => {
    return video.id == id;
  });
  if (!video) {
    return res.send("Video not found");
  }

  return res.render("video", { items: video });
});

server.listen(port, () => {
  console.log(`Server is running http://localhost:${port}`);
});
