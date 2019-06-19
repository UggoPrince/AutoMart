/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
import Users from '../models/Users';

class UsersController {
  async addUser(req, res) {
    const reqBody = req.body;
    reqBody.isAdmin = false;

    const result = await Users.signup(reqBody);
    if (result.error) {
      res.status(400).send({
        status: 400,
        error: result.errorMessage,
      });
    } else {
      res.status(201).send({
        status: 201,
        data: result.rows[0],
      });
    }
  }

  async getUser(req, res) {
    const reqBody = req.body;
    const result = await Users.signin(reqBody);
    if (result.error) {
      res.status(400).send({
        status: 400,
        error: result.errorMessage,
      });
    } else {
      res.status(200).send({
        status: 200,
        data: result.rows[0],
      });
    }
  }
}

export default new UsersController();
