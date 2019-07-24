import express from 'express';
import flagsControllers from '../controllers/FlagsController';
import FlagsMiddleware from '../middlewares/FlagsMiddleware';
import Auth from '../middlewares/AuthMiddleware';

const Router = express.Router();
// reports a fraudulent advert
Router.post('/flag', [Auth.authenticate, FlagsMiddleware.validateReportAdvert], flagsControllers.reportAdvert);

export default Router;
