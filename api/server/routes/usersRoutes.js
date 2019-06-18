/* eslint-disable linebreak-style */
import express from 'express';
import usersControllers from '../controllers/UsersController';
import { validateUserSignup, validateUserSignin } from '../middlewares/UsersMiddleware';

const Router = express.Router();
Router.post('/auth/signup', validateUserSignup, usersControllers.addUser); // signup a user
Router.post('/auth/signin', validateUserSignin, usersControllers.getUser); // login a user

export default Router;
