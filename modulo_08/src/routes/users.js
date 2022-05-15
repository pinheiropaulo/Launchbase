import { Router } from 'express';
import SessionController from '../app/controller/SessionController';
import UserController from '../app/controller/UserController';
import SessionValidator from '../app/validators/SessionValidator';
import UserValidator from '../app/validators/UserValidator';

export const routes = Router();

// // Login / Logout
routes.get('/login', SessionController.loginForm);
routes.post('/login', SessionValidator.login, SessionController.login);
routes.post('/logout', SessionController.logout);

// // Reset Password
// routes.get('/forgot-password', SessionController.forgotForm);
// routes.get('/password-reset', SessionController.resetForm);
// routes.post('/forgot-password', SessionController.forgot);
// routes.post('/password-reset', SessionController.reset);

// // User
routes.get('/register', UserController.registerForm);
routes.post('/register', UserValidator.post, UserController.post);

routes.get('/', UserValidator.show, UserController.show);
routes.put('/', UserValidator.update, UserController.update);
// routes.delete('/', UserController.delete);
