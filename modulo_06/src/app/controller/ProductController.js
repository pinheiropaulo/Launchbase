const create = (req, res) => {
  return res.render("products/create.njk");
};

export const ProductController = {
  create,
};
