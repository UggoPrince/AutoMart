/* eslint-disable linebreak-style */
import Validator from './validators/ValidateOrder';
import OrderChecker from './database_checkers/OrderChecker';

export const validatePurchaseOrder = async (req, res, next) => {
  const { buyer, carId, amount } = req.body;
  const result = Validator.validateMakeOrderFields(buyer, carId, amount);
  if (result.error) {
    res.status(400).send(Validator.Response());
  } else {
    let error = false;
    const errorMessage = {};
    const user = await OrderChecker.checkBuyerId(buyer);
    const car = await OrderChecker.checkOrderedCar(carId);
    if (user.error) {
      error = true;
      errorMessage.buyer = `User with id (${buyer}) do not exist.`;
    }
    if (car.error) {
      error = true;
      errorMessage.carId = `Car with id (${carId}) do not exist.`;
    }
    if (error) {
      res.status(404).send({
        status: 404,
        error: errorMessage,
      });
    } else {
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
        error: `Order with id (${orderId}) do not exist.`,
      });
    } else {
      req.body.amount = order.data.amount;
      next();
    }
  }
};
