/* eslint-disable linebreak-style */
import express from 'express';
import ordersControllers from '../controllers/OrdersController';
import {
  validatePurchaseOrder,
  validateUpdateOrderPrice, validateGetOrders,
} from '../middlewares/OrdersMiddleware';
import authenticate from '../middlewares/AuthMiddleware';

const Router = express.Router();
// makes a purchase order
Router.post('/order/', [authenticate, validatePurchaseOrder], ordersControllers.makePurchaseOrder);
// update a purchase order's price
Router.patch('/order/:order_id/price',
  [authenticate, validateUpdateOrderPrice], ordersControllers.updateOrderPrice);
// get all orders of a user
Router.get('/order', [authenticate, validateGetOrders], ordersControllers.getOrders);

export default Router;
