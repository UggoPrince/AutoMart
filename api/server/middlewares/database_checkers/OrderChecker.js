/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
import Orders from '../../models/Orders';

class CheckOrder {
  async checkId(orderId) {
    const order = await Orders.getOrderById(orderId);
    if (order.rowCount > 0) return { error: false, data: order.rows[0] };
    return { error: true };
  }

  async checkOrderedCar(carId) {
    const car = await Orders.getOrderedCar(carId);
    if (car.rowCount > 0) return { error: false, data: car.rows[0] };
    return { error: true };
  }

  async checkBuyerId(buyerId) {
    const buyer = await Orders.getOrderOwner(buyerId);
    if (buyer.rowCount > 0) return { error: false, data: buyer.rows[0] };
    return { error: true };
  }
}

export default new CheckOrder();
