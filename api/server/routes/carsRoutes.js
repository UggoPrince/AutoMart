/* eslint-disable linebreak-style */
import express from 'express';
import multipart from 'connect-multiparty';
import carsControllers from '../controllers/CarsController';
import {
  validateCreateAdvert,
  validateUpdateCarStatus,
  validateUpdateCarPrice,
  validateViewACar,
  validateViewCars,
  validateDeleteCar,
} from '../middlewares/CarsMiddleware';
import authenticate from '../middlewares/AuthMiddleware';

const Router = express.Router();
const multipartMiddleware = multipart();

// add a car
Router.post('/car', [authenticate, multipartMiddleware, validateCreateAdvert], carsControllers.addCar);
// update car status
Router.patch('/car/:car_id/status', [authenticate, validateUpdateCarStatus], carsControllers.updateCarStatus);
// update the price of a car
Router.patch('/car/:car_id/price', [authenticate, validateUpdateCarPrice], carsControllers.updateCarPrice);
// view a specific car
Router.get('/car/:car_id', [authenticate, validateViewACar], carsControllers.getSpecificCar);
// get cars
Router.get('/car', [authenticate, validateViewCars], carsControllers.getCars);
// delete a car
Router.delete('/car/:car_id', [authenticate, validateDeleteCar], carsControllers.deleteCar);

export default Router;
