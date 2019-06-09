/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
import usersService from '../services/UsersService';
import Validator from '../helpers/ValidateUser';

class UsersController {
  getUser(req, res) {
    const {
      email,
      password,
    } = req.body;
    const validator = new Validator();
    const validUserReq = validator.validateSigninFields(email, password);
    if (validUserReq.error) {
      res.status(404).send({
        status: 404,
        error: validUserReq.data,
      });
    } else if (!usersService.emailExist(email)) {
      res.status(404).send({
        status: 404,
        error: 'You don\'t have an account. Sign up now!',
      });
    } else {
      const userData = usersService.signin(email, password);
      if (userData.valid) {
        res.status(200).send({
          status: 200,
          data: userData.user.data,
        });
      } else {
        res.status(404).send({
          status: 404,
          error: 'Your email/password is incorrect.',
        });
      }
    }
  }

  addUser(req, res) {
    const {
      firstname,
      lastname,
      email,
      password,
      address,
      phoneNumber,
    } = req.body;

    const validator = new Validator();
    const validUserReq = validator.validateSignupFields(
      firstname, lastname, email, password, address, phoneNumber,
    );
    if (validUserReq.error) {
      res.status(404).send({
        status: 404,
        error: validUserReq.data,
      });
    } else if (usersService.emailExist(email)) {
      res.status(404).send({
        status: 404,
        error: 'You already have an account. Sign in.',
      });
    } else {
      const addedUser = usersService.signup(
        firstname, lastname, email, password, address, phoneNumber,
      );
      res.status(201).send({
        status: 201,
        data: addedUser.data,
      });
    }
  }
}

export default new UsersController();
