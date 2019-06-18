/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
import Database from '../database/Database';

const db = new Database();

class Users {
  async signup(req) {
    const queryString = `
      INSERT INTO users (
        email, first_name, last_name, password, address, phone_number, is_admin
        )
      VALUES (
        '${req.email}', '${req.firstname}', '${req.lastname}', '${req.password}', '${req.address}',
        ${req.phoneNumber}, ${req.isAdmin}
        ) RETURNING *`;
    const result = await db.pool.query(queryString).then(res => res).catch(err => err);
    return result;
  }
}

export default new Users();
