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
    const result = await db.query(queryString).then(res => res).catch(err => err);
    if (result.name
      && result.name === 'error'
      && result.detail === `Key (email)=(${userData.email}) already exists.`) {
      return { error: true, errorMessage: 'You already have an account with this email. Login.' };
    }
    return result;
  }

  async signin(userData) {
    const queryString = `SELECT * FROM users WHERE email = '${userData.email}'`;
    const result = await db.query(queryString);
    if (result.rowCount === 0) {
      return { error: true, errorMessage: 'You do not have an account. Sign up now.' };
    }
    if (result.rowCount > 0 && result.rows[0].password !== userData.password) {
      return { error: true, errorMessage: 'Incorrect email/password' };
    }
    return result;
  }

  async getUserById(id) {
    const queryString = `SELECT * FROM users WHERE id = '${id}';`;
    const result = await db.query(queryString);
    return result;
  }
}

export default new Users();
