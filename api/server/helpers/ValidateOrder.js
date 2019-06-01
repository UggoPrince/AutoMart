/* eslint-disable linebreak-style */
/* eslint-disable no-useless-constructor */
import Validator from './Validator';

class ValidateOrder extends Validator {
  constructor() {
    super();
  }

  validateMakeOrderFields(buyer, carId, amount) {
    this.isValidBuyer(buyer, 'buyer'); // validate user id
    this.isValidCarId(carId, 'carId'); // validate car id
    this.isValidAmount(amount, 'amount'); // validate buyer's price
    return this.getErrorMessage();
  }

  validateUpdateOrderFields(newAmount, orderId) {
    this.isValidAmount(newAmount, 'newAmount'); // validate the new price that's to update old price
    this.isValidOrderId(orderId, 'orderId'); // validate the order's id
    return this.getErrorMessage();
  }

  isValidBuyer(buyer, field) {
    this.validateInt(buyer, field);
  }

  isValidCarId(carId, field) {
    this.validateInt(carId, field);
  }

  isValidAmount(amount, field) {
    this.validateFloat(amount, field);
  }

  isValidOrderId(orderId, field) {
    this.validateInt(orderId, field);
  }
}

export default ValidateOrder;
