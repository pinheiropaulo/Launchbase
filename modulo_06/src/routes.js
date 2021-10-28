import { Router } from 'express';
import { ProductController } from './app/controller/ProductController';

const productController = new ProductController();

const routes = Router();

function teste() {
  console.log('TESTE');
}

routes.get('/', (req, res) => {
  res.render('layout.njk');
});

routes.get('/products/create', productController.create);
routes.get('/products/:id/edit', productController.edit);

routes.post('/products', productController.post);
routes.put('/products', productController.put);

routes.delete('/products', productController.delete);

// Alias
routes.get('/ads/create', (req, res) => {
  res.redirect('/products/create');
});

export { routes };
