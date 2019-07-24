/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */
import Validator from './validators/ValidateOrder';
import OrderChecker from './database_checkers/OrderChecker';

class OrdersMiddleware {
  async validatePurchaseOrder(req, res, next) {
    const { car_id, amount } = req.body;
    const result = Validator.validateMakeOrderFields(car_id, amount);
    if (result.error) {
      res.status(400).send(Validator.Response());
    } else {
      let error = false;
      const errorMessage = {};
      const car = await OrderChecker.checkOrderedCar(car_id);
      if (car.error) {
        error = true;
        errorMessage.car_id = `Car with id (${car_id}) does not exist.`;
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
  }

  async validateUpdateOrderPrice(req, res, next) {
    const { price } = req.body;
    const { order_id } = req.params;
    const result = Validator.validateUpdateOrderFields(price, order_id);
    if (result.error) {
      res.status(400).send(Validator.Response());
    } else {
      const order = await OrderChecker.checkId(order_id);
      if (order.error) {
        res.status(404).send({
          status: 404,
          error: `Order with id (${order_id}) does not exist.`,
        });
      } else {
        req.body.old_amount = order.data.amount;
        next();
      }
    }
  }

  async validateGetOrders(req, res, next) {
    const rQuery = req.query;
    const result = Validator.validateGetOrdersOfAUser(rQuery.buyer);
    const user_id = parseInt(rQuery.buyer, 10);
    if (result.error) {
      res.status(400).send(Validator.Response());
    } else if (user_id !== req.token.id) {
      res.status(400).send({ status: 400, error: 'invalid buyer.' });
    } else {
      req.qLength = 1;
      next();
    }
  }
}

export default new OrdersMiddleware();
