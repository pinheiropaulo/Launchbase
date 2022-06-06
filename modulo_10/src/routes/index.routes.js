import { Router } from 'express';
import HomeController from '../app/controller/HomeController';
import { routes as cart } from './cart.routes';
import { routes as orders } from './orders.routes';
import { routes as products } from './products.routes';
import { routes as users } from './users.routes';

export const routes = Router();

// Home
routes.get('/', HomeController.index);

routes.use('/products', products);
routes.use('/users', users);
routes.use('/cart', cart);
routes.use('/orders', orders);

// Alias
routes.get('/ads/create', (req, res) => {
  return res.redirect('/products/create');
});

routes.get('/accounts', (req, res) => {
  return res.redirect('/users/login');
});
