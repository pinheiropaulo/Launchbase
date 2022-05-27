import { Router } from 'express';
import OrderController from '../app/controller/OrderController';
import SessionController from '../app/controller/SessionController';
import UserController from '../app/controller/UserController';
import {
  isLoggedRedirectToUsers,
  onlyUsers,
} from '../app/middlewares/SessionMiddlewares';
import SessionValidator from '../app/validators/SessionValidator';
import UserValidator from '../app/validators/UserValidator';

export const routes = Router();

// // Login / Logout
routes.get('/login', isLoggedRedirectToUsers, SessionController.loginForm);
routes.post('/login', SessionValidator.login, SessionController.login);
routes.post('/logout', SessionController.logout);

// // Reset Password
routes.get('/forgot-password', SessionController.forgotForm);
routes.get('/password-reset', SessionController.resetForm);
routes.post(
  '/forgot-password',
  SessionValidator.forgot,
  SessionController.forgot,
);
routes.post('/password-reset', SessionValidator.reset, SessionController.reset);

// User
routes.get('/register', UserController.registerForm);
routes.post('/register', UserValidator.post, UserController.post);

routes.get('/', onlyUsers, UserValidator.show, UserController.show);
routes.put('/', UserValidator.update, UserController.update);
routes.delete('/', UserController.delete);

routes.get('/ads', UserController.ads);

routes.post('/order', onlyUsers, OrderController.post);

// routes.get('/order/success', (req, res) => res.render('orders/success'));
// routes.get('/order/error', (req, res) => res.render('orders/error'));
