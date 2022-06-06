import { LoadService } from '../services/LoadProductService';

export default {
  async index(req, res) {
    try {
      const allProducts = await LoadService.load('products');

      const products = allProducts.filter((product, index) =>
        index > 2 ? false : true,
      );

      return res.render('home/index', { products });
    } catch (error) {
      console.error(error);
    }
  },
};
