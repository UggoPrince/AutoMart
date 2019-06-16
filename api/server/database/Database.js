/* eslint-disable linebreak-style */
/* eslint-disable no-console */
import { Pool } from 'pg';
import dotenv from 'dotenv';
import { createTables, dropTables } from './Tables';

dotenv.config();

export default class Database {
  constructor() {
    this.pool = Pool({
      user: process.env.DATABASE_USER,
      host: process.env.DATABASE_HOST,
      database: process.env.DATABASE,
      password: process.env.DATABASE_PASSWORD,
      port: process.env.DATABASE_PORT,
    });

    /*
    this.pool.on('connect', () => {
      // eslint-disable-next-line no-console
      console.log('connected to the db');
    });
    */

    /*
    this.pool.on('error', (err) => {
      // eslint-disable-next-line no-console
      console.error('Unexpected error on idle client', err);
      process.exit(-1);
    });
    */
  }

  async query(queryString) {
    // eslint-disable-next-line arrow-body-style
    const result = await this.pool.query(queryString, (err, res) => {
      /*
      if (err) {
        console.log(err);
        return err;
      }
      */
      return res;
    });
    return result;
  }

  async createTables() {
    await this.query(createTables);
  }

  async dropTables() {
    await this.query(dropTables);
  }
}
