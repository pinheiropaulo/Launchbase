import categoryModel from '../models/CategoryModel';
import productModel from '../models/ProductModel';
import fileModel from '../models/FileModel';

import { formatPrice, date } from '../../lib/utils';

export default {
  async create(req, res) {
    const results = await categoryModel.all();

    const categories = results.rows;

    return res.render('products/create.njk', { categories });
  },

  async post(req, res) {
    if (req.files.length == 0) {
      return res.send('Please, send at least one image');
    }

    let results = await productModel.create(req.body);
    const productId = results.rows[0].id;

    const filesPromise = req.files.map((file) => {
      fileModel.create({ ...file, product_id: productId });
    });

    await Promise.all(filesPromise);

    return res.redirect(`products/${productId}/edit`);
  },

  async show(req, res) {
    let results = await productModel.find(req.params.id);
    const product = results.rows[0];

    if (!product) {
      return res.send('Product Not Found');
    }

    const { day, month, hour, minute } = date(product.updated_at);

    product.published = {
      day: `${day}/${month}`,
      hour: `${hour}h${minute}`,
    };

    product.oldPrice = formatPrice(product.old_price);
    product.price = formatPrice(product.price);

    results = await productModel.files(product.id);
    const files = results.rows.map((file) => ({
      ...file,
      src: `${req.protocol}://${req.headers.host}${file.path.replace(
        'public',
        '',
      )}`,
    }));

    return res.render('products/show.njk', { product, files });
  },

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

    results = await productModel.files(product.id);
    let files = results.rows;
    files = files.map((file) => ({
      ...file,
      src: `${req.protocol}://${req.headers.host}${file.path.replace(
        'public',
        '',
      )}`,
    }));

    return res.render('products/edit.njk', { product, categories, files });
  },

  async put(req, res) {
    if (req.files.length != 0) {
      const newFilesPromise = req.files.map((file) =>
        fileModel.create({ ...file, product_id: req.body.id }),
      );

      await Promise.all(newFilesPromise);
    }

    if (req.body.removed_files) {
      const removedFiles = req.body.removed_files.split(',');
      const lastIndex = removedFiles.length - 1;
      removedFiles.splice(lastIndex, 1);

      const removedFilesPromise = removedFiles.map((id) =>
        fileModel.delete(id),
      );

      await Promise.all(removedFilesPromise);
    }

    req.body.price = req.body.price.replace(/\D/g, '');

    if (req.body.old_price != req.body.price) {
      const oldProduct = await productModel.find(req.body.id);
      req.body.old_price = oldProduct.rows[0].price;
    }

    await productModel.update(req.body);

    return res.redirect(`/products/${req.body.id}`);
  },

  async delete(req, res) {
    await productModel.delete(req.body.id);

    return res.redirect('/products/create');
  },
};
