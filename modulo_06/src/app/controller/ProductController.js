class ProductController {
  create = (req, res) => {
    return res.render("products/create.njk");
  };
}

export default new ProductController();
