import { formatPrice } from '../../lib/utils';
import productModel from '../models/ProductModel';

export default {
  async index(req, res) {
    try {
      let result;
      let params = {};

      const { filter, category } = req.query;

      if (!filter) {
        return res.redirect('/');
      }

      params.filter = filter;

      if (category) {
        params.category = category;
      }

      result = await productModel.search(params);

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

      const productsPromise = result.rows.map(async (product) => {
        product.img = await getImage(product.id);
        product.oldPrice = formatPrice(product.old_price);
        product.price = formatPrice(product.price);

        return product;
      });

      const products = await Promise.all(productsPromise);

      const search = {
        term: req.query.filter,
        total: products.length,
      };

      const categories = products
        .map((product) => ({
          id: product.category_id,
          name: product.category_name,
        }))
        .reduce((categoriesFiltered, category) => {
          const found = categoriesFiltered.some(
            (cat) => cat.id === category.id,
          );

          if (!found) {
            categoriesFiltered.push(category);
          }

          return categoriesFiltered;
        }, []);

      return res.render('search/index', { products, search, categories });
    } catch (error) {
      console.error(error);
    }
  },
};
