import { unlinkSync } from 'fs';
import categoryModel from '../models/CategoryModel';
import fileModel from '../models/FileModel';
import productModel from '../models/ProductModel';

const LoadProductService = require('../services/LoadProductService');

export default {
  async create(req, res) {
    try {
      const categories = await categoryModel.findAll();

      return res.render('products/create.njk', { categories });
    } catch (error) {
      console.error(error);
    }
  },

  async post(req, res) {
    try {
      if (req.files.length == 0) {
        return res.send('Please, send at least one image');
      }

      let {
        category_id,
        name,
        description,
        old_price,
        price,
        quantity,
        status,
      } = req.body;

      price = price.replace(/\D/g, '');

      const product_id = await productModel.create({
        category_id,
        user_id: req.session.userId,
        name,
        description,
        old_price: old_price || price,
        price,
        quantity,
        status: status || 1,
      });

      const filesPromise = req.files.map((file) => {
        fileModel.create({
          name: file.filename,
          path: file.path,
          product_id,
        });
      });

      await Promise.all(filesPromise);

      return res.redirect(`products/${product_id}/edit`);
    } catch (error) {
      console.error(error);
    }
  },

  async show(req, res) {
    try {
      const product = await LoadProductService.load('product', {
        where: {
          id: req.params.id,
        },
      });

      return res.render('products/show.njk', { product });
    } catch (error) {
      console.error(error);
    }
  },

  async edit(req, res) {
    try {
      const product = await LoadProductService.load('product', {
        where: {
          id: req.params.id,
        },
      });

      const categories = await categoryModel.findAll();

      return res.render('products/edit.njk', { product, categories });
    } catch (error) {
      console.error(error);
    }
  },

  async put(req, res) {
    try {
      if (req.files.length != 0) {
        const newFilesPromise = req.files.map((file) => {
          fileModel.create({
            name: file.filename,
            path: file.path,
            product_id: req.body.id,
          });
        });

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
        req.body.old_price = oldProduct.price;
      }

      await productModel.update(req.body.id, {
        category_id: req.body.category_id,
        name: req.body.name,
        description: req.body.description,
        old_price: req.body.old_price,
        price: req.body.price,
        quantity: req.body.quantity,
        status: req.body.status,
      });

      return res.redirect(`/products/${req.body.id}`);
    } catch (error) {
      console.error(error);
    }
  },

  async delete(req, res) {
    const files = await productModel.files(req.body.id);

    await productModel.delete(req.body.id);

    files.map((file) => {
      try {
        unlinkSync(file.path);
      } catch (error) {
        console.error(error);
      }
    });

    return res.redirect('/products/create');
  },
};
