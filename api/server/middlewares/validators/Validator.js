/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */

let error = false;
let errorMessages = {};

class Validator {
  static integrateError(field, message) {
    error = true;
    errorMessages[field] = message;
  }

  static isEmptyString(str) {
    const space = /^\s*$/;
    if (str === '' || str === null || str === undefined || space.test(str)) { return true; }
    return false;
  }

  static validateInt(int, field) {
    const intRegExp = /^\d+$/;
    if (Validator.isEmptyString(int)) {
      Validator.integrateError(field, `No ${field} entered.`);
    } else if (!intRegExp.test(int) || int === '0') {
      Validator.integrateError(field, `Invalid ${field}.`);
    }
  }

  static validateFloat(float, field) {
    const regExp = /^\d+(.{1}[\d]+)?$/;
    if (Validator.isEmptyString(float)) {
      Validator.integrateError(field, `No ${field} entered.`);
    } else if (!regExp.test(float) || float === '0' || float === '0.0') {
      Validator.integrateError(field, `Invalid ${field}.`);
    }
  }

  static validateString(str, field) {
    const regExp = /^[\w ]+[^_]$/;
    if (Validator.isEmptyString(str)) {
      Validator.integrateError(field, `No ${field} entered.`);
    } else if (!regExp.test(str)) {
      Validator.integrateError(field, `Invalid ${field}.`);
    }
  }

  static getErrorMessage() {
    return { error, data: errorMessages };
  }

  static Response() {
    return {
      status: 400,
      error: errorMessages,
    };
  }

  static refresh() {
    error = false;
    errorMessages = {};
  }
}

export default Validator;
