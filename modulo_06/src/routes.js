import { Router } from 'express';

import multer from './app/middlewares/multer';

import ProductController from './app/controller/ProductController';
import HomeController from './app/controller/HomeController';

const routes = Router();

routes.get('/', HomeController.index);

routes.get('/products/create', ProductController.create);
routes.get('/products/:id', ProductController.show);
routes.get('/products/:id/edit', ProductController.edit);

routes.post('/products', multer.array('photos', 6), ProductController.post);
routes.put('/products', multer.array('photos', 6), ProductController.put);
routes.delete('/products', ProductController.delete);

// Alias
routes.get('/ads/create', (req, res) => {
  res.redirect('/products/create');
});

export { routes };
