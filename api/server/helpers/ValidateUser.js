/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-control-regex */
import Validator from './Validator';

class ValidateUser extends Validator {
  constructor() {
    super();
  }

  validateSigninFields(email, password) {
    this.isValidEmail(email, 'email'); // validate email
    this.isValidPassword(password, 'password'); // validate password
    return { error: this.error, data: this.errorMessages };
  }

  validateSignupFields(firstname, lastname, email, password, address, phoneNumber) {
    this.isValidName(firstname, 'firstname'); // validate firstname
    this.isValidName(lastname, 'lastname'); // validate lastname
    this.isValidAddress(address, 'address'); // validate address
    this.isValidEmail(email, 'email'); // validate email
    this.isValidPhoneNumber(phoneNumber, 'phone_number'); // validate phone number
    this.isValidPassword(password, 'password'); // validate password

    return { error: this.error, data: this.errorMessages };
  }

  isValidName(name, type) {
    const nameRegExp = /^(?=.*[A-Za-z])+\w+[^_]$/;
    if (this.isEmptyString(name)) {
      this.integrateError(type, `No ${type} entered.`);
    } else if (!nameRegExp.test(name)) {
      this.integrateError(type, `Invalid ${type}.`);
    }
  }

  isValidAddress(address, type) {
    const addRegExp = /^[a-zA-Z0-9\s,.'-]{3,}$/;
    if (this.isEmptyString(address)) {
      this.integrateError(type, `No ${type} entered.`);
    } else if (!addRegExp.test(address)) {
      this.integrateError(type, `Invalid ${type}.`);
    }
  }

  isValidEmail(email, type) {
    const emailRegExp = /^(([^<>()\\[\]\\.,;:@"\x00-\x20\x7F]|\\.)+|("""([^\x0A\x0D"\\]|\\\\)+"""))@(([a-z]|#\d+?)([a-z0-9-]|#\d+?)*([a-z0-9]|#\d+?)\.)+([a-z]{2,4})$/i;
    if (this.isEmptyString(email)) {
      this.integrateError(type, `No ${type} entered.`);
    } else if (!emailRegExp.test(email)) {
      this.integrateError(type, `Invalid ${type}.`);
    }
  }

  isValidPassword(password, type) {
    const passRegExp = /^(?=.*[A-Za-z])+(?=.*\d)[A-Za-z\d]{8,}$/; // /^[A-Za-z]\w{8,}$/;
    if (this.isEmptyString(password)) {
      this.integrateError(type, `${type} must have a letter, number and atleast 8 characters long.`);
    } else if (!passRegExp.test(password)) {
      this.integrateError(type, `Invalid ${type}. password must have a letter, number and atleast 8 characters long.`);
    }
  }

  isValidPhoneNumber(phoneNumber, type) {
    const telRegExp = /^(\+\d{1,3} ?)?(\(\d{1,5}\)|\d{1,5}) ?\d{3}?\d{0,7}( (x|xtn|ext|extn|pax|pbx|extension)?\.? ?\d{2-5})?$/i;
    if (this.isEmptyString(phoneNumber)) {
      this.integrateError(type, `No ${type} entered.`);
    } else if (!telRegExp.test(phoneNumber)) {
      this.integrateError(type, `Invalid ${type}.`);
    }
  }
}

export default ValidateUser;
