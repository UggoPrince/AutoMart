/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
import Database from '../database/Database';
import Users from './Users';
import Cars from './Cars';

const db = new Database();
class Orders {
  async makeOrder(userData) {
    let error = false;
    const errorMessage = {};
    const user = await Users.getUserById(userData.buyer);
    const car = await Cars.getCarById(userData.carId);
    if (user.rowCount === 0) {
      error = true;
      errorMessage.buyer = `User with id (${userData.buyer}) do not exist in database`;
    }
    if (car.rowCount === 0) {
      error = true;
      errorMessage.carId = `Car with id (${userData.carId}) do not exist in database`;
    }
    if (error) {
      return {
        error,
        errorMessage,
      };
    }
    const queryString = `
      INSERT INTO orders (buyer, car_id, amount)
      VALUES ('${userData.buyer}', '${userData.carId}', '${userData.amount}') RETURNING *`;
    const result = await db.query(queryString);
    return result;
  }
}
export default new Orders();
