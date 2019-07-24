/* eslint-disable class-methods-use-this */
import Database from '../database/Database';
import Cars from './Cars';

const db = new Database();
class Flags {
  async report(flagData) {
    const queryString = `INSERT INTO flags (car_id, reason, description)
      VALUES (${flagData.car_id}, '${flagData.reason}', '${flagData.description}')
      RETURNING id, car_id, reason, description;`;
    const result = await db.query(queryString);
    return result;
  }

  async getFlaggedCar(id) {
    const result = await Cars.getCarById(id);
    return result;
  }
}

export default new Flags();
