/* eslint-disable linebreak-style */
import express from 'express';
import multipart from 'connect-multiparty';
import carsControllers from '../controllers/CarsController';

const Router = express.Router();
const multipartMiddleware = multipart();

Router.post('/car', multipartMiddleware, carsControllers.addCar); // add a car
Router.patch('/car/:car_id/status', carsControllers.updateCarStatus); // update car status
Router.patch('/car/:car_id/price', carsControllers.updateCarPrice); // update the price of a car
Router.get('/car/:car_id', carsControllers.getACar); // get a specific car
Router.get('/car', carsControllers.getCars); // get cars
Router.delete('/car/:car_id', carsControllers.deleteCar); // delete a car

export default Router;
