import { Router } from 'express';
import CartController from '../app/controller/CartController';

export const routes = Router();

routes.get('/', CartController.index);
routes.post('/:id/add-one', CartController.addOne);
routes.post('/:id/remove-one', CartController.removeOne);
routes.post('/:id/delete', CartController.delete);
