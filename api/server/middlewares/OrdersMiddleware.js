/* eslint-disable linebreak-style */
import Validator from './validators/ValidateOrder';
import OrderChecker from './database_checkers/OrderChecker';

export const validatePurchaseOrder = async (req, res, next) => {
  const { carId, amount } = req.body;
  const result = Validator.validateMakeOrderFields(carId, amount);
  if (result.error) {
    res.status(400).send(Validator.Response());
  } else {
    let error = false;
    const errorMessage = {};
    const car = await OrderChecker.checkOrderedCar(carId);
    if (car.error) {
      error = true;
      errorMessage.carId = `Car with id (${carId}) does not exist.`;
    }
    if (error) {
      res.status(404).send({
        status: 404,
        error: errorMessage,
      });
    } else {
      req.body.buyer = req.token.id;
      req.body.carPrice = car.data.price;
      next();
    }
  }
};

export const validateUpdateOrderPrice = async (req, res, next) => {
  const { newAmount } = req.body;
  const orderId = req.params.order_id;
  const result = Validator.validateUpdateOrderFields(newAmount, orderId);
  if (result.error) {
    res.status(400).send(Validator.Response());
  } else {
    const order = await OrderChecker.checkId(orderId);
    if (order.error) {
      res.status(404).send({
        status: 404,
        error: `Order with id (${orderId}) does not exist.`,
      });
    } else {
      req.body.amount = order.data.amount;
      next();
    }
  }
};
