/* eslint-disable linebreak-style */
/* eslint-disable import/no-extraneous-dependencies */
import dotenv from 'dotenv';
import 'babel-polyfill';
import app from '../server/index';
import Database from '../server/database/Database';

dotenv.config();
const port = process.env.PORT || 4000;

process.env.DATABASE = 'automartTest';

const db = new Database();
db.createTables();

app.listen(port);

export default app;
