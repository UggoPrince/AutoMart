/* eslint-disable linebreak-style */
import express from 'express';
import multipart from 'connect-multiparty';
import carsControllers from '../controllers/CarsController';
import { validateCreateAdvert, validateUpdateCarStatus } from '../middlewares/CarsMiddleware';

const Router = express.Router();
const multipartMiddleware = multipart();

Router.post('/car', [multipartMiddleware, validateCreateAdvert], carsControllers.addCar); // add a car
Router.patch('/car/:car_id/status', validateUpdateCarStatus, carsControllers.updateCarStatus); // update car status

export default Router;
