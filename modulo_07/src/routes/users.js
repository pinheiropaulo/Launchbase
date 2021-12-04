import { Router } from 'express';

import SessionController from '../app/controller/SessionController';
import UserController from '../app/controller/UserController';

const routes = Router();

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
// routes.get('/register', UserController.post);

// routes.get('/', UserController.show);
// routes.put('/', UserController.put);
// routes.delete('/', UserController.delete);

export { routes };
