/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
import Orders from '../models/Orders';

class OrdersController {
  async makePurchaseOrder(req, res) {
    const reqBody = req.body;
    const result = await Orders.makeOrder(reqBody);
    if (result.error) {
      res.status(400).send({
        status: 400,
        error: result.errorMessage,
      });
    } else {
      result.rows[0].price_offered = result.rows[0].amount;
      delete result.rows[0].amount;
      res.status(201).send({
        status: 201,
        data: result.rows[0],
      });
    }
  }

  async updateOrderPrice(req, res) {
    const reqBody = req.body;
    reqBody.orderId = req.params.order_id;
    const result = await Orders.updatePrice(reqBody);
    if (result.error) {
      res.status(404).send({
        status: 404,
        error: result.errorMessage,
      });
    } else {
      res.status(200).send({
        status: 200,
        data: result.rows[0],
      });
    }
  }
}

export default new OrdersController();
