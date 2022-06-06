import { Router } from 'express';
import OrderController from '../app/controller/OrderController';
import { onlyUsers } from '../app/middlewares/SessionMiddlewares';

export const routes = Router();

routes.get('/', onlyUsers, OrderController.index);
routes.post('/', onlyUsers, OrderController.post);
routes.get('/sales', onlyUsers, OrderController.sales);
routes.get('/:id', onlyUsers, OrderController.show);
routes.post('/:id/:action', onlyUsers, OrderController.update);
