/* eslint-disable linebreak-style */
import Validator from './validators/ValidateUser';

export const validateUserSignup = (req, res, next) => {
  const {
    firstname, lastname, email, password, address, phoneNumber,
  } = req.body;
  const result = Validator.validateSignupFields(
    firstname, lastname, email, password, address, phoneNumber,
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
