/* eslint-disable class-methods-use-this */
/* eslint-disable camelcase */
import Orders from '../models/Orders';

class OrdersController {
  async makePurchaseOrder(req, res) {
    const reqBody = req.body;
    const result = await Orders.makeOrder(reqBody);
    result.rows[0].price_offered = result.rows[0].amount;
    delete result.rows[0].amount;
    res.status(201).send({
      status: 201,
      data: result.rows[0],
    });
  }

  async updateOrderPrice(req, res) {
    const reqBody = req.body;
    reqBody.order_id = req.params.order_id;
    const result = await Orders.updatePrice(reqBody);
    const {
      id, car_id, status, amount,
    } = result.rows[0];
    result.rows[0] = {
      id, car_id, status, old_price_offered: reqBody.old_amount, new_price_offered: amount,
    };
    res.status(200).send({
      status: 200,
      data: result.rows[0],
    });
  }

  async getOrders(req, res) {
    const rQuery = req.query;
    const result = await Orders.getOrderByBuyer(rQuery.buyer);
    res.status(200).send({
      status: 200,
      data: result.rows,
    });
  }
}

export default new OrdersController();
