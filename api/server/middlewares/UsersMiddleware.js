/* eslint-disable class-methods-use-this */
/* eslint-disable camelcase */
import Validator from './validators/ValidateUser';

class UsersMiddleware {
  validateUserSignup(req, res, next) {
    const {
      first_name, last_name, email, password, address,
    } = req.body;
    const result = Validator.validateSignupFields(
      first_name, last_name, email, password, address,
    );
    if (result.error) {
      res.status(400).send(Validator.Response());
    } else {
      next();
    }
  }

  async validateUserSignin(req, res, next) {
    const { email, password } = req.body;
    const result = Validator.validateSigninFields(email, password);
    if (result.error) {
      res.status(400).send(Validator.Response());
    } else {
      next();
    }
  }
}

export default new UsersMiddleware();
