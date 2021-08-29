const categoryModel = require('../models/CategoryModel');
const productModel = require('../models/ProductModel');

module.exports = {
  async create(req, res) {
    const results = await categoryModel.all();

    const categories = results.rows;

    return res.render('products/create.njk', { categories });
  },

  async post(req, res) {
    let results = await productModel.create(req.body);
    const productId = results.rows[0].id;

    results = await categoryModel.all();
    const categories = results.rows;

    return res.render('products/create.njk', { productId, categories });
  },
};
