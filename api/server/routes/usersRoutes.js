/* eslint-disable linebreak-style */
import express from 'express';
import usersControllers from '../controllers/UsersController';
import userMiddleware from '../middlewares/UsersMiddleware';

const Router = express.Router();
Router.post('/auth/signup', userMiddleware, usersControllers.addUser); // signup a user

export default Router;
