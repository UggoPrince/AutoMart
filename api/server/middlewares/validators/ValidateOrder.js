/* eslint-disable linebreak-style */
/* eslint-disable no-useless-constructor */
import Validator from './Validator';

class ValidateOrder extends Validator {
  static validateMakeOrderFields(carId, amount) {
    ValidateOrder.refresh();
    ValidateOrder.isValidCarId(carId, 'carId'); // validate car id
    ValidateOrder.isValidAmount(amount, 'amount'); // validate buyer's price
    return ValidateOrder.getErrorMessage();
  }

  static validateUpdateOrderFields(newAmount, orderId) {
    ValidateOrder.isValidAmount(newAmount, 'newAmount'); // validate the new price that's to update old price
    ValidateOrder.isValidOrderId(orderId, 'orderId'); // validate the order's id
    return ValidateOrder.getErrorMessage();
  }

  static isValidCarId(carId, field) {
    ValidateOrder.validateInt(carId, field);
  }

  static isValidAmount(amount, field) {
    ValidateOrder.validateFloat(amount, field);
  }

  static isValidOrderId(orderId, field) {
    this.validateInt(orderId, field);
  }
}

export default ValidateOrder;
