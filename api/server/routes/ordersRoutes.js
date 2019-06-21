/* eslint-disable linebreak-style */
import express from 'express';
import ordersControllers from '../controllers/OrdersController';
import { validatePurchaseOrder, validateUpdateOrderPrice } from '../middlewares/OrdersMiddleware';
import authenticate from '../middlewares/AuthMiddleware';

const Router = express.Router();
// makes a purchase order
Router.post('/order/', [authenticate, validatePurchaseOrder], ordersControllers.makePurchaseOrder);
// update a purchase order's price
Router.patch('/order/:order_id/price',
  [authenticate, validateUpdateOrderPrice], ordersControllers.updateOrderPrice);

export default Router;
