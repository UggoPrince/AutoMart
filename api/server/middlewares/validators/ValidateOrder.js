/* eslint-disable linebreak-style */
/* eslint-disable no-useless-constructor */
import Validator from './Validator';

class ValidateOrder extends Validator {
  static validateMakeOrderFields(buyer, carId, amount) {
    ValidateOrder.refresh();
    ValidateOrder.isValidBuyer(buyer, 'buyer'); // validate user id
    ValidateOrder.isValidCarId(carId, 'carId'); // validate car id
    ValidateOrder.isValidAmount(amount, 'amount'); // validate buyer's price
    return ValidateOrder.getErrorMessage();
  }

  static isValidBuyer(buyer, field) {
    ValidateOrder.validateInt(buyer, field);
  }

  static isValidCarId(carId, field) {
    ValidateOrder.validateInt(carId, field);
  }

  static isValidAmount(amount, field) {
    ValidateOrder.validateFloat(amount, field);
  }
}

export default ValidateOrder;
