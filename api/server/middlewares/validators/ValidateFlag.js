/* eslint-disable linebreak-style */
/* eslint-disable no-useless-constructor */
/* eslint-disable camelcase */
import Validator from './Validator';

class ValidateFlag extends Validator {
  static validateReportAdvertFields(car_id, reason, description) {
    ValidateFlag.refresh();
    ValidateFlag.validateInt(car_id, 'carId');
    ValidateFlag.validateString(reason, 'reason');
    ValidateFlag.validateString(description, 'description');
    return ValidateFlag.getErrorMessage();
  }
}

export default ValidateFlag;
