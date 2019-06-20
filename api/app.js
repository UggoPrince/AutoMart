/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
// import 'babel-polyfill';
import dotenv from 'dotenv';
import app from './server/index';
import Database from './server/database/Database';
import {
  createTables, dropTables, seedUsers, seedCars,
} from './server/database/Tables';

dotenv.config();
const port = process.env.PORT || 4000;

const db = new Database();
db.pool.query(createTables, async (err) => {
  if (err) console.log(err);
  // await db.query(seedUsers);
  // await db.query(seedCars);
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
