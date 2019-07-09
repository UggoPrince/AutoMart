/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
import Database from '../database/Database';
import Cars from './Cars';

const db = new Database();
class Orders {
  async makeOrder(orderData) {
    const queryString = `
      INSERT INTO orders (buyer, car_id, amount)
      VALUES ('${orderData.buyer}', '${orderData.car_id}', '${orderData.amount}')
      RETURNING id, car_id, created_on, status, amount;`;
    const result = await db.query(queryString);
    result.rows[0].price = orderData.price;
    return result;
  }

  async getOrderedCar(id) {
    const car = await Cars.getCarById(id);
    return car;
  }

  async getOrderById(id) {
    const queryString = `SELECT * FROM orders WHERE id = '${id}';`;
    const result = await db.query(queryString);
    return result;
  }

  async updatePrice(orderData) {
    const queryString = `
    UPDATE orders SET amount = '${orderData.amount}'
    WHERE id = '${orderData.order_id}' AND status = 'pending'
    RETURNING id, car_id, status, amount;`;
    const result = await db.query(queryString);
    return result;
  }
}
export default new Orders();
