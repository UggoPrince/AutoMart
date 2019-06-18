/* eslint-disable linebreak-style */
import Validator from './validators/ValidateUser';

const validateUserSignup = async (req, res, next) => {
  const {
    firstname, lastname, email, password, address, phoneNumber,
  } = req.body;
  const result = Validator.signupFields(firstname, lastname, email, password, address, phoneNumber);
  if (result.error) {
    res.status(400).send(Validator.Response());
  } else {
    next();
  }
};

export default validateUserSignup;
