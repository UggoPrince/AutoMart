import 'core-js/stable';
import 'regenerator-runtime/runtime';
import dotenv from 'dotenv';
import debug from 'debug';
import app from './server/index';
import Database from './server/database/Database';
import Tables from './server/database/Tables';

dotenv.config();
const port = process.env.PORT || 4000;

const db = new Database();
db.pool.query(Tables.createTables, (err) => {
  if (err) debug.log(err);
});

app.listen(port, () => debug.log('App started!'));
