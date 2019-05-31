/* eslint-disable linebreak-style */
/* eslint-disable no-useless-constructor */
import Validator from './Validator';

class ValidateFlag extends Validator {
  constructor() {
    super();
  }

  validateReportAdvertFields(carId, reason, description) {
    this.validateInt(carId, 'carId');
    this.validateString(reason, 'reason');
    this.validateString(description, 'description');
    return { error: this.error, data: this.errorMessages };
  }
}

export default ValidateFlag;
