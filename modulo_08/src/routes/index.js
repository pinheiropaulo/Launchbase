import { Router } from 'express';
import HomeController from '../app/controller/HomeController';
import { routes as products } from './products';
import { routes as users } from './users';

export const routes = Router();

// Home
routes.get('/', HomeController.index);

routes.use('/products', products);
routes.use('/users', users);

// Alias
routes.get('/ads/create', (req, res) => {
  return res.redirect('/products/create');
});

routes.get('/accounts', (req, res) => {
  return res.redirect('/users/register');
});
