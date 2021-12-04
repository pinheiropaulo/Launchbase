import { Router } from 'express';

import ProductController from '../app/controller/ProductController';
import SearchController from '../app/controller/SearchController';

import multer from '../app/middlewares/multer';

const routes = Router();

// Search
routes.get('/search', SearchController.index);

// Products
routes.get('/create', ProductController.create);
routes.get('/:id', ProductController.show);
routes.get('/:id/edit', ProductController.edit);

routes.post('/', multer.array('photos', 6), ProductController.post);
routes.put('/', multer.array('photos', 6), ProductController.put);
routes.delete('/', ProductController.delete);

export { routes };
