import { date, formatPrice } from '../../lib/utils';
import productModel from '../models/ProductModel';

async function getImages(productId) {
  let files = await productModel.files(productId);
  files = files.map((file) => ({
    ...file,
    src: `${file.path.replace('public', '')}`,
  }));

  return files;
}

async function format(product) {
  const files = await getImages(product.id);

  product.img = files[0].src;
  product.files = files;

  product.formattedOldPrice = formatPrice(product.old_price);
  product.formattedPrice = formatPrice(product.price);

  const { day, month, hour, minute } = date(product.updated_at);

  product.published = {
    day: `${day}/${month}`,
    hour: `${hour}h${minute}`,
  };

  return product;
}

const LoadService = {
  load(service, filter) {
    this.filter = filter;
    return this[service]();
  },

  async product() {
    try {
      const product = await productModel.findOne(this.filter);

      return format(product);
    } catch (error) {
      console.error(error);
    }
  },

  async products() {
    try {
      const products = await productModel.findAll(this.filter);
      const productsPromise = products.map(format);

      return Promise.all(productsPromise);
    } catch (error) {
      console.error(error);
    }
  },

  format,
};

module.exports = LoadService;
