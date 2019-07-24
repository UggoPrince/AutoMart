/* eslint-disable class-methods-use-this */
/* eslint-disable camelcase */
import Users from '../models/Users';
import Auth from '../middlewares/AuthMiddleware';
import {
  errorNoAccount,
  errorInvalidEmailPass,
  errorEmailDuplicate,
} from '../helpers/errorHandlers';

class UsersController {
  async addUser(req, res) {
    const reqBody = req.body;
    reqBody.is_admin = false;
    if (reqBody.email === 'johndoe@gmail.com'
    || reqBody.email === 'admin@gmail.com'
    || reqBody.email === 'bestadmin@yahoo.com') {
      reqBody.is_admin = true;
    }

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
      const {
        // eslint-disable-next-line camelcase
        id, first_name, last_name, email, address, phone_number, is_admin,
      } = result.rows[0];
      result.rows[0] = {
        token, id, first_name, last_name, email, address, phone_number, is_admin,
      };
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
      const {
        // eslint-disable-next-line camelcase
        id, first_name, last_name, email, address, phone_number, is_admin,
      } = result.rows[0];
      result.rows[0] = {
        token, id, first_name, last_name, email, address, phone_number, is_admin,
      };
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
      is_admin: userData.is_admin,
    };
    const token = Auth.signToken(tokenData);
    return token;
  }
}

export default new UsersController();
