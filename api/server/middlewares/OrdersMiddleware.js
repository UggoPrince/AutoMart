/* eslint-disable linebreak-style */
import Validator from './validators/ValidateOrder';

const validatePurchaseOrder = (req, res, next) => {
  const { buyer, carId, amount } = req.body;
  const result = Validator.validateMakeOrderFields(buyer, carId, amount);
  if (result.error) {
    res.status(400).send(Validator.Response());
  } else {
    next();
  }
};

export default validatePurchaseOrder;
