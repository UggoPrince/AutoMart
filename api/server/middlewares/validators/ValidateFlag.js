/* eslint-disable linebreak-style */
/* eslint-disable no-useless-constructor */
import Validator from './Validator';

class ValidateFlag extends Validator {
  static validateReportAdvertFields(carId, reason, description) {
    ValidateFlag.refresh();
    ValidateFlag.validateInt(carId, 'carId');
    ValidateFlag.validateString(reason, 'reason');
    ValidateFlag.validateString(description, 'description');
    return ValidateFlag.getErrorMessage();
  }
}

export default ValidateFlag;
