import { Pool } from 'pg';
import dotenv from 'dotenv';
import debug from 'debug';

dotenv.config();

export default class Database {
  constructor() {
    this.pool = new Pool({
      user: process.env.DATABASE_USER,
      host: process.env.DATABASE_HOST,
      database: process.env.DATABASE,
      password: process.env.DATABASE_PASSWORD,
      port: process.env.DATABASE_PORT,
      idleTimeoutMillis: 50000,
    });
    this.pool.on('error', (err, client) => {
      console.error('Unexpected error on idle client', err)
    });
  }

  async query(queryString) {
    const result = await this.pool.query(queryString).then(res => res)
      .catch((error) => { debug.log(error); return error; });
    return result;
  }
}
