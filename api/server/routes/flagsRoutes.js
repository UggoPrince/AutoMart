/* eslint-disable linebreak-style */
import express from 'express';
import flagsControllers from '../controllers/FlagsController';

const Router = express.Router();
Router.post('/flag', flagsControllers.reportAdvert); // reports a fraudulent advert

export default Router;
