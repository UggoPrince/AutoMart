/* eslint-disable linebreak-style */
import express from 'express';
import ordersControllers from '../controllers/OrdersController';
import { validatePurchaseOrder, validateUpdateOrderPrice } from '../middlewares/OrdersMiddleware';

const Router = express.Router();
// makes a purchase order
Router.post('/order/', validatePurchaseOrder, ordersControllers.makePurchaseOrder);
// update a purchase order's price
Router.patch('/order/:order_id/price', validateUpdateOrderPrice, ordersControllers.updateOrderPrice);

export default Router;
