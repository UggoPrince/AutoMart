import express from 'express';
import multipart from 'connect-multiparty';
import carsControllers from '../controllers/CarsController';
import CarsMiddleware from '../middlewares/CarsMiddleware';
import Auth from '../middlewares/AuthMiddleware';

const Router = express.Router();
const multipartMiddleware = multipart();

// add a car
Router.post('/car', [Auth.authenticate, multipartMiddleware, CarsMiddleware.validateCreateAdvert],
  carsControllers.addCar);
// update car status
Router.patch('/car/:car_id/status', [Auth.authenticate, CarsMiddleware.validateUpdateCarStatus],
  carsControllers.updateCarStatus);
// update the price of a car
Router.patch('/car/:car_id/price', [Auth.authenticate, CarsMiddleware.validateUpdateCarPrice],
  carsControllers.updateCarPrice);
// view a specific car
Router.get('/car/:car_id', [Auth.authenticate, CarsMiddleware.validateViewACar], carsControllers.getSpecificCar);
// get cars
Router.get('/car', [Auth.authenticate, CarsMiddleware.validateViewCars], carsControllers.getCars);
// delete a car
Router.delete('/car/:car_id', [Auth.authenticate, CarsMiddleware.validateDeleteCar], carsControllers.deleteCar);

export default Router;
