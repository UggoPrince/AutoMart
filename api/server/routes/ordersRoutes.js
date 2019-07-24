import express from 'express';
import ordersControllers from '../controllers/OrdersController';
import OrdersMiddleware from '../middlewares/OrdersMiddleware';
import Auth from '../middlewares/AuthMiddleware';

const Router = express.Router();
// makes a purchase order
Router.post('/order/', [Auth.authenticate, OrdersMiddleware.validatePurchaseOrder],
  ordersControllers.makePurchaseOrder);
// update a purchase order's price
Router.patch('/order/:order_id/price', [Auth.authenticate, OrdersMiddleware.validateUpdateOrderPrice],
  ordersControllers.updateOrderPrice);
// get all orders of a user
Router.get('/order', [Auth.authenticate, OrdersMiddleware.validateGetOrders], ordersControllers.getOrders);

export default Router;
