/* eslint-disable linebreak-style */
import Validator from './validators/ValidateOrder';

export const validatePurchaseOrder = (req, res, next) => {
  const { buyer, carId, amount } = req.body;
  const result = Validator.validateMakeOrderFields(buyer, carId, amount);
  if (result.error) {
    res.status(400).send(Validator.Response());
  } else {
    next();
  }
};

export const validateUpdateOrderPrice = (req, res, next) => {
  const { newAmount } = req.body;
  const orderId = req.params.order_id;
  const result = Validator.validateUpdateOrderFields(newAmount, orderId);
  if (result.error) {
    res.status(400).send(Validator.Response());
  } else {
    next();
  }
};
