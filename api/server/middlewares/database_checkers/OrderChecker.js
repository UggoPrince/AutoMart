/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
/* eslint-disable camelcase */
import Orders from '../../models/Orders';

class CheckOrder {
  async checkId(order_Id) {
    const order = await Orders.getOrderById(order_Id);
    if (order.rowCount > 0) return { error: false, data: order.rows[0] };
    return { error: true };
  }

  async checkOrderedCar(car_id) {
    const car = await Orders.getOrderedCar(car_id);
    if (car.rowCount > 0) return { error: false, data: car.rows[0] };
    return { error: true };
  }
}

export default new CheckOrder();
