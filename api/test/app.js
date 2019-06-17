/* eslint-disable linebreak-style */
/* eslint-disable import/no-extraneous-dependencies */
import dotenv from 'dotenv';
import 'core-js';
import 'regenerator-runtime';
import app from '../server/index';
import Database from '../server/database/Database';
import { createTables } from '../server/database/Tables';

dotenv.config();
const port = process.env.PORT || 4000;

process.env.DATABASE = 'automartTest';

export const db = new Database();

// eslint-disable-next-line no-unused-vars
db.pool.query(createTables, (err, res) => {
  // eslint-disable-next-line no-console
  if (err) console.log(err);
});

app.listen(port);

export default app;
