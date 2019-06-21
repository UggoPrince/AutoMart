/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
import Users from '../models/Users';
import JWT from '../authentication/JWT';
import {
  errorNoAccount,
  errorInvalidEmailPass,
  errorEmailDuplicate,
} from '../helpers/errorHandlers';

class UsersController {
  async addUser(req, res) {
    const reqBody = req.body;
    reqBody.isAdmin = false;

    const result = await Users.signup(reqBody);
    if (result.name
      && result.name === 'error'
      && result.detail === `Key (email)=(${reqBody.email}) already exists.`) {
      res.status(400).send({
        status: 400,
        error: errorEmailDuplicate(),
      });
    } else {
      const token = UsersController.prepareToken(result.rows[0]);
      result.rows[0].token = token;
      res.status(201).send({
        status: 201,
        data: result.rows[0],
      });
    }
  }

  async getUser(req, res) {
    const reqBody = req.body;
    const result = await Users.signin(reqBody);
    if (result.rowCount === 0) {
      res.status(400).send({
        status: 400,
        error: errorNoAccount(),
      });
    } else if (result.rows[0].password !== reqBody.password) {
      res.status(400).send({
        status: 400,
        error: errorInvalidEmailPass(),
      });
    } else {
      const token = UsersController.prepareToken(result.rows[0]);
      result.rows[0].token = token;
      res.status(200).send({
        status: 200,
        data: result.rows[0],
      });
    }
  }

  static prepareToken(userData) {
    const tokenData = {
      id: userData.id,
      email: userData.email,
      isAdmin: userData.is_admin,
    };
    const token = JWT.signToken(tokenData);
    return token;
  }
}

export default new UsersController();
