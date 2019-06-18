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
