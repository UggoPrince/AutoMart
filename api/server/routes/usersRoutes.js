/* eslint-disable linebreak-style */
import express from 'express';
import usersControllers from '../controllers/UsersController';

const Router = express.Router();
Router.post('/auth/signup', usersControllers.addUser); // signup a user
Router.post('/auth/signin', usersControllers.getUser); // signin a user

export default Router;
