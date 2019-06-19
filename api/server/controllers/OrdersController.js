/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
import Orders from '../models/Orders';

class OrdersController {
  async makeOrder(req, res) {
    const reqBody = req.body;
    const result = await Orders.makeOrder(reqBody);
    if (result.error) {
      res.status(400).send({
        status: 400,
        error: result.errorMessage,
      });
    } else {
      res.status(201).send({
        status: 201,
        data: result.rows[0],
      });
    }
  }
}

export default new OrdersController();
