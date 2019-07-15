/* eslint-disable linebreak-style */
/* eslint-disable camelcase */
import Validator from './validators/ValidateUser';

export const validateUserSignup = (req, res, next) => {
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
};

export const validateUserSignin = async (req, res, next) => {
  const { email, password } = req.body;
  const result = Validator.validateSigninFields(email, password);
  if (result.error) {
    res.status(400).send(Validator.Response());
  } else {
    next();
  }
};
