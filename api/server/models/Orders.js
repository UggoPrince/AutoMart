/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
import Database from '../database/Database';
import Users from './Users';
import Cars from './Cars';

const db = new Database();
class Orders {
  async makeOrder(orderData) {
    let error = false;
    const errorMessage = {};
    const user = await Users.getUserById(orderData.buyer);
    const car = await Cars.getCarById(orderData.carId);
    if (user.rowCount === 0) {
      error = true;
      errorMessage.buyer = `User with id (${orderData.buyer}) do not exist.`;
    }
    if (car.rowCount === 0) {
      error = true;
      errorMessage.carId = `Car with id (${orderData.carId}) do not exist.`;
    }
    if (error) {
      return {
        error,
        errorMessage,
      };
    }
    const queryString = `
      INSERT INTO orders (buyer, car_id, amount)
      VALUES ('${orderData.buyer}', '${orderData.carId}', '${orderData.amount}')
      RETURNING id, car_id, created_on, status, amount;`;
    const result = await db.query(queryString);
    result.rows[0].price = car.rows[0].price;
    return result;
  }

  async getOrderById(id) {
    const queryString = `SELECT * FROM orders WHERE id = '${id}';`;
    const result = await db.query(queryString);
    return result;
  }

  async updatePrice(orderData) {
    const order = await this.getOrderById(orderData.orderId);
    if (order.rowCount === 0) {
      return { error: true, errorMessage: `Order with id (${orderData.orderId}) do not exist.` };
    }
    const queryString = `
    UPDATE orders SET amount = '${orderData.newAmount}'
    WHERE id = '${orderData.orderId}' AND status = 'pending'
    RETURNING id, car_id, status, amount;`;
    const result = await db.query(queryString);
    result.rows[0].old_price_offered = order.rows[0].amount;
    result.rows[0].new_price_offered = result.rows[0].amount;
    delete result.rows[0].amount;
    return result;
  }
}
export default new Orders();
