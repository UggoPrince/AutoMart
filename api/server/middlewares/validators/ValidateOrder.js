/* eslint-disable linebreak-style */
/* eslint-disable no-useless-constructor */
/* eslint-disable camelcase */
import Validator from './Validator';

class ValidateOrder extends Validator {
  static validateMakeOrderFields(car_id, amount) {
    ValidateOrder.refresh();
    ValidateOrder.isValidCarId(car_id, 'car_id'); // validate car id
    ValidateOrder.isValidAmount(amount, 'amount'); // validate buyer's price
    return ValidateOrder.getErrorMessage();
  }

  static validateUpdateOrderFields(amount, order_id) {
    ValidateOrder.isValidAmount(amount, 'amount'); // validate the new price that's to update old price
    ValidateOrder.isValidOrderId(order_id, 'order_id'); // validate the order's id
    return ValidateOrder.getErrorMessage();
  }

  static isValidCarId(car_id, field) {
    ValidateOrder.validateInt(car_id, field);
  }

  static isValidAmount(amount, field) {
    ValidateOrder.validateFloat(amount, field);
  }

  static isValidOrderId(id, field) {
    this.validateInt(id, field);
  }
}

export default ValidateOrder;
