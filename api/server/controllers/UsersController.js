/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
import Users from '../models/Users';

class UsersController {
  async addUser(req, res) {
    const data = req.body;
    data.isAdmin = false;

    const result = await Users.signup(data);
    if (result.name
      && result.name === 'error'
      && result.detail === `Key (email)=(${data.email}) already exists.`) {
      res.status(400).send({
        status: 400,
        data: 'You already have an account with this email. Login.',
      });
    } else {
      res.status(201).send({
        status: 201,
        data: result.rows[0],
      });
    }
  }
}

export default new UsersController();
