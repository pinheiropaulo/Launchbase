import { Router } from 'express';
import ProductController from '../app/controller/ProductController';
import SearchController from '../app/controller/SearchController';
import multer from '../app/middlewares/multer';
import { onlyUsers } from '../app/middlewares/SessionMiddlewares';

export const routes = Router();

// Search
routes.get('/search', SearchController.index);

// Products
routes.get('/create', onlyUsers, ProductController.create);
routes.get('/:id', ProductController.show);
routes.get('/:id/edit', onlyUsers, ProductController.edit);

routes.post('/', onlyUsers, multer.array('photos', 6), ProductController.post);
routes.put('/', onlyUsers, multer.array('photos', 6), ProductController.put);
routes.delete('/', onlyUsers, ProductController.delete);
