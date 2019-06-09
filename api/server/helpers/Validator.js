/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */

class Validator {
  constructor() {
    this.error = false;
    this.errorMessages = {};
  }

  integrateError(field, message) {
    this.error = true;
    this.errorMessages[field] = message;
  }

  isEmptyString(str) {
    const space = /^\s*$/;
    if (str === '' || str === null || str === undefined || space.test(str)) { return true; }
    return false;
  }

  validateInt(int, field) {
    const intRegExp = /^\d+$/;
    if (this.isEmptyString(int)) {
      this.integrateError(field, `No ${field} entered.`);
    } else if (!intRegExp.test(int) || int === '0') {
      this.integrateError(field, `Invalid ${field}.`);
    }
  }

  validateFloat(float, field) {
    const regExp = /^\d+(.{1}[\d]+)?$/;
    if (this.isEmptyString(float)) {
      this.integrateError(field, `No ${field} entered.`);
    } else if (!regExp.test(float) || float === '0' || float === '0.0') {
      this.integrateError(field, `Invalid ${field}.`);
    }
  }

  validateString(str, field) {
    const regExp = /^[\w ]+[^_]$/;
    if (this.isEmptyString(str)) {
      this.integrateError(field, `No ${field} entered.`);
    } else if (!regExp.test(str)) {
      this.integrateError(field, `Invalid ${field}.`);
    }
  }

  getErrorMessage() {
    return { error: this.error, data: this.errorMessages };
  }
}

export default Validator;
