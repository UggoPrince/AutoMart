import express from 'express';
import usersControllers from '../controllers/UsersController';
import UserMiddleware from '../middlewares/UsersMiddleware';

const Router = express.Router();
Router.post('/auth/signup', UserMiddleware.validateUserSignup, usersControllers.addUser); // signup a user
Router.post('/auth/signin', UserMiddleware.validateUserSignin, usersControllers.getUser); // login a user

export default Router;
