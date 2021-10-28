import { CategoryModel } from '../models/CategoryModel';
import { ProductModel } from '../models/ProductModel';

import { formatPrice } from '../../lib/utils';

const categoryModel = new CategoryModel();
const productModel = new ProductModel();

export class ProductController {
  async create(req, res) {
    const results = await categoryModel.all();

    const categories = results.rows;

    return res.render('products/create.njk', { categories });
  }

  async post(req, res) {
    let results = await productModel.create(req.body);
    const productId = results.rows[0].id;

    return res.redirect(`products/${productId}`);
  }

  async edit(req, res) {
    let results = await productModel.find(req.params.id);
    const product = results.rows[0];

    if (!product) {
      return res.send('Product not found');
    }

    product.old_price = formatPrice(product.old_price);
    product.price = formatPrice(product.price);

    results = await categoryModel.all();
    const categories = results.rows;

    return res.render('products/edit.njk', { product, categories });
  }

  async put(req, res) {
    req.body.price = req.body.price.replace(/\D/g, '');

    if (req.body.old_price != req.body.price) {
      const oldProduct = await productModel.find(req.body.id);
      req.body.old_price = oldProduct.rows[0].price;
    }

    await productModel.update(req.body);

    return res.redirect(`/products/${req.body.id}/edit`);
  }

  async delete(req, res) {
    await productModel.delete(req.body.id);

    return res.redirect('/products/create');
  }
}
