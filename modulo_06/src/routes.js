import { Router } from "express";

import ProductController from "./app/controller/ProductController";

const routes = new Router();

routes.get("/", (req, res) => {
  res.render("layout.njk");
});

routes.get("/products/create", ProductController.create);

routes.get("/ads/create", (req, res) => {
  res.redirect("/products/create");
});

export { routes };
