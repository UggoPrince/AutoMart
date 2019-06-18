/* eslint-disable linebreak-style */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-control-regex */
/* eslint-disable class-methods-use-ValidateUser */
import Validator from './Validator';

class ValidateUser extends Validator {
  static signupFields(firstname, lastname, email, password, address, phoneNumber) {
    ValidateUser.refresh();
    ValidateUser.isValidName(firstname, 'firstname'); // validate firstname
    ValidateUser.isValidName(lastname, 'lastname'); // validate lastname
    ValidateUser.isValidAddress(address, 'address'); // validate address
    ValidateUser.isValidEmail(email, 'email'); // validate email
    ValidateUser.isValidPhoneNumber(phoneNumber, 'phoneNumber'); // validate phone number
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
    const nameRegExp = /^(?=.*[A-Za-z])+\w+[^_]$/;
    if (ValidateUser.isEmptyString(name)) {
      ValidateUser.integrateError(field, `No ${field} entered.`);
    } else if (!nameRegExp.test(name)) {
      ValidateUser.integrateError(field, `Invalid ${field}.`);
    }
  }

  static isValidAddress(address, field) {
    const addRegExp = /^[a-zA-Z0-9\s,.'-]{3,}$/;
    if (ValidateUser.isEmptyString(address)) {
      ValidateUser.integrateError(field, `No ${field} entered.`);
    } else if (!addRegExp.test(address)) {
      ValidateUser.integrateError(field, `Invalid ${field}.`);
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
    const passRegExp = /^(?=.*[A-Za-z])+(?=.*\d)[A-Za-z\d]{8,}$/; // /^[A-Za-z]\w{8,}$/;
    if (ValidateUser.isEmptyString(password)) {
      ValidateUser.integrateError(field, `${field} must have a letter, number and atleast 8 characters long.`);
    } else if (!passRegExp.test(password)) {
      ValidateUser.integrateError(field, `Invalid ${field}. password must have a letter, number and atleast 8 characters long.`);
    }
  }

  static isValidPhoneNumber(phoneNumber, field) {
    const telRegExp = /^(\+\d{1,3} ?)?(\(\d{1,5}\)|\d{1,5}) ?\d{3}?\d{0,7}( (x|xtn|ext|extn|pax|pbx|extension)?\.? ?\d{2-5})?$/i;
    if (ValidateUser.isEmptyString(phoneNumber)) {
      ValidateUser.integrateError(field, `No ${field} entered.`);
    } else if (!telRegExp.test(phoneNumber)) {
      ValidateUser.integrateError(field, `Invalid ${field}.`);
    }
  }
}

export default ValidateUser;
