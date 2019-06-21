/* eslint-disable linebreak-style */
import express from 'express';
import flagsControllers from '../controllers/FlagsController';
import validateReportAdvert from '../middlewares/FlagsMiddleware';

const Router = express.Router();
Router.post('/flag', validateReportAdvert, flagsControllers.reportAdvert); // reports a fraudulent advert

export default Router;
