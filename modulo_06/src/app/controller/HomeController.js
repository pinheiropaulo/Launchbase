import productModel from '../models/ProductModel';
import fileModel from '../models/FileModel';

import { formatPrice } from '../../lib/utils';

export default {
  async index(req, res) {
    let result = await productModel.all();
    const products = result.rows;

    if (!products) {
      return res.send('Product not found');
    }

    async function getImage(productId) {
      let results = await productModel.files(productId);
      const files = results.rows.map(
        (file) =>
          `${req.protocol}://${req.headers.host}${file.path.replace(
            'public',
            '',
          )}`,
      );

      return files[0];
    }

    const productsPromise = products
      .map(async (product) => {
        product.img = await getImage(product.id);
        product.oldPrice = formatPrice(product.old_price);
        product.price = formatPrice(product.price);

        return product;
      })
      .filter((product, index) => (index > 2 ? false : true));

    const lastAdded = await Promise.all(productsPromise);

    return res.render('home/index', { products: lastAdded });
  },
};
