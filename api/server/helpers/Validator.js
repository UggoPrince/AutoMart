/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */

class Validator {
  constructor() {
    this.error = false;
    this.errorMessages = {};
  }

  integrateError(type, message) {
    this.error = true;
    this.errorMessages[type] = message;
  }

  isEmptyString(str) {
    const space = /^\s*$/;
    if (str === '' || str === null || str === undefined || space.test(str)) { return true; }
    return false;
  }
}

export default Validator;
