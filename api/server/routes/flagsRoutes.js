/* eslint-disable linebreak-style */
import express from 'express';
import flagsControllers from '../controllers/FlagsController';
import validateReportAdvert from '../middlewares/FlagsMiddleware';
import authenticate from '../middlewares/AuthMiddleware';

const Router = express.Router();
// reports a fraudulent advert
Router.post('/flag', [authenticate, validateReportAdvert], flagsControllers.reportAdvert);

export default Router;
