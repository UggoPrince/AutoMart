/* eslint-disable linebreak-style */
import express from 'express';
import multipart from 'connect-multiparty';
import carsControllers from '../controllers/CarsController';

const Router = express.Router();
const multipartMiddleware = multipart();

Router.post('/car', multipartMiddleware, carsControllers.addCar); // add a car

export default Router;
