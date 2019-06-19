/* eslint-disable linebreak-style */
import express from 'express';
import ordersControllers from '../controllers/OrdersController';
import validatePurchaseOrder from '../middlewares/OrdersMiddleware';

const Router = express.Router();
Router.post('/order/', validatePurchaseOrder, ordersControllers.makeOrder); // makes a purchase order

export default Router;
