/* eslint-disable linebreak-style */
import express from 'express';
import multipart from 'connect-multiparty';
import carsControllers from '../controllers/CarsController';
import {
  validateCreateAdvert,
  validateUpdateCarStatus,
  validateUpdateCarPrice,
  validateViewACar,
} from '../middlewares/CarsMiddleware';

const Router = express.Router();
const multipartMiddleware = multipart();

// add a car
Router.post('/car', [multipartMiddleware, validateCreateAdvert], carsControllers.addCar);
// update car status
Router.patch('/car/:car_id/status', validateUpdateCarStatus, carsControllers.updateCarStatus);
// update the price of a car
Router.patch('/car/:car_id/price', validateUpdateCarPrice, carsControllers.updateCarPrice);
// view a specific car
Router.get('/car/:car_id', validateViewACar, carsControllers.viewSpecificCar);

export default Router;
