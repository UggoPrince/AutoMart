/* eslint-disable linebreak-style */
import express from 'express';
import ordersControllers from '../controllers/OrdersController';

const Router = express.Router();
Router.post('/order/', ordersControllers.makeOrder); // makes a purchase order

export default Router;
