/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
import Database from '../database/Database';

const db = new Database();

class Users {
  async signup(userData) {
    const queryString = `
      INSERT INTO users (
        email, first_name, last_name, password, address, is_admin
        )
      VALUES (
        '${userData.email}', '${userData.first_name}', '${userData.last_name}',
        '${userData.password}', '${userData.address}', ${userData.is_admin}
        ) RETURNING *`;
    const result = await db.query(queryString);
    return result;
  }

  async signin(userData) {
    const queryString = `SELECT * FROM users WHERE email = '${userData.email}'`;
    const result = await db.query(queryString);
    return result;
  }

  async getUserById(id) {
    const queryString = `SELECT * FROM users WHERE id = '${id}';`;
    const result = await db.query(queryString);
    return result;
  }
}

export default new Users();
