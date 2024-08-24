import { Router } from 'express';
import {CustomerController} from "./controlles/CustomerController";

const routes = Router();
const customerController = new CustomerController();

routes.get('/customers', customerController.findAll);

routes.get('/customers/:id', customerController.verifyIfExist, customerController.findById);

routes.post('/customers', customerController.create);

routes.put('/customers/:id', customerController.verifyIfExist, customerController.update);

routes.delete('/customers/:id', customerController.verifyIfExist, customerController.delete);

export { routes }