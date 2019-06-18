/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
import Users from '../models/Users';

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
        error: 'You already have an account with this email. Login.',
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
    if (result.rowCount === 0) {
      res.status(400).send({
        status: 400,
        error: 'You do not have an account. Sign up now.',
      });
    } else if (result.rowCount > 0 && result.rows[0].password !== reqBody.password) {
      res.status(400).send({
        status: 400,
        error: 'Incorrect email/password',
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
