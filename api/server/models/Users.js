/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
import Database from '../database/Database';

const db = new Database();

class Users {
  async signup(userData) {
    const queryString = `
      INSERT INTO users (
        email, first_name, last_name, password, address, phone_number, is_admin
        )
      VALUES (
        '${userData.email}', '${userData.firstname}', '${userData.lastname}',
        '${userData.password}', '${userData.address}',
        ${userData.phoneNumber}, ${userData.isAdmin}
        ) RETURNING *`;
    const result = await db.pool.query(queryString).then(res => res).catch(err => err);
    return result;
  }

  async signin(userData) {
    const queryString = `SELECT * FROM users WHERE email = '${userData.email}'`;
    const result = await db.pool.query(queryString).then(res => res);
    return result;
  }
}

export default new Users();
