/* eslint-disable linebreak-style */
import express from 'express';
import multipart from 'connect-multiparty';
import carsControllers from '../controllers/CarsController';
import validateCreateAdvert from '../middlewares/CarsMiddleware';

const Router = express.Router();
const multipartMiddleware = multipart();

Router.post('/car', [multipartMiddleware, validateCreateAdvert], carsControllers.addCar); // add a car

export default Router;
