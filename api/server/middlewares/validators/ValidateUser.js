/* eslint-disable no-control-regex */
/* eslint-disable camelcase */
import Validator from './Validator';

class ValidateUser extends Validator {
  static validateSignupFields(first_name, last_name, email, password, address) {
    ValidateUser.refresh();
    ValidateUser.isValidName(first_name, 'first_name'); // validate firstname
    ValidateUser.isValidName(last_name, 'last_name'); // validate lastname
    ValidateUser.isValidAddress(address, 'address'); // validate address
    ValidateUser.isValidEmail(email, 'email'); // validate email
    ValidateUser.isValidPassword(password, 'password'); // validate password
    return ValidateUser.getErrorMessage();
  }

  static validateSigninFields(email, password) {
    ValidateUser.refresh();
    ValidateUser.isValidEmail(email, 'email'); // validate email
    ValidateUser.isValidPassword(password, 'password'); // validate password
    return ValidateUser.getErrorMessage();
  }

  static isValidName(name, field) {
    if (ValidateUser.isEmptyString(name)) {
      ValidateUser.integrateError(field, `No ${field} entered.`);
    }
  }

  static isValidAddress(address, field) {
    if (ValidateUser.isEmptyString(address)) {
      ValidateUser.integrateError(field, `No ${field} entered.`);
    }
  }

  static isValidEmail(email, field) {
    const emailRegExp = /^(([^<>()\\[\]\\.,;:@"\x00-\x20\x7F]|\\.)+|("""([^\x0A\x0D"\\]|\\\\)+"""))@(([a-z]|#\d+?)([a-z0-9-]|#\d+?)*([a-z0-9]|#\d+?)\.)+([a-z]{2,4})$/i;
    if (ValidateUser.isEmptyString(email)) {
      ValidateUser.integrateError(field, `No ${field} entered.`);
    } else if (!emailRegExp.test(email)) {
      ValidateUser.integrateError(field, `Invalid ${field}.`);
    }
  }

  static isValidPassword(password, field) {
    if (ValidateUser.isEmptyString(password)) {
      ValidateUser.integrateError(field, `No ${field} entered`);
    }
  }
}

export default ValidateUser;
