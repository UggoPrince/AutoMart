/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
import usersService from '../services/UsersService';
import Validator from '../helpers/ValidateUser';

class UsersController {
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
    const validUserContent = validator.checkSignupFields(
      firstname, lastname, email, password, address, phoneNumber,
    );
    if (validUserContent.error) {
      res.status(404).send({
        status: 404,
        error: validUserContent.data,
      });
    } else if (usersService.emailExist(email)) {
      res.status(404).send({
        status: 404,
        error: 'You already have an account. Sign in.',
      });
    } else {
      const addedUser = usersService.add(
        firstname, lastname, email, password, address, phoneNumber,
      );
      res.status(201).send({
        status: 201,
        data: addedUser,
      });
    }
  }
}

export default new UsersController();
