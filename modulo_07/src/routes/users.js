import { Router } from 'express';
import UserController from '../app/controller/UserController';
import UserValidator from '../app/validators/UserValidator';

export const routes = Router();

// // Login / Logout
// routes.get('/login', SessionController.loginForm);
// routes.post('/login', SessionController.login);
// routes.post('/logout', SessionController.logout);

// // Reset Password
// routes.get('/forgot-password', SessionController.forgotForm);
// routes.get('/password-reset', SessionController.resetForm);
// routes.post('/forgot-password', SessionController.forgot);
// routes.post('/password-reset', SessionController.reset);

// // User
routes.get('/register', UserController.registerForm);
routes.post('/register', UserValidator.post, UserController.post);

// routes.get('/', UserController.show);
// routes.put('/', UserController.put);
// routes.delete('/', UserController.delete);
