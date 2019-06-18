/* eslint-disable linebreak-style */
/* eslint-disable import/no-extraneous-dependencies */
import dotenv from 'dotenv';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import app from '../server/index';
import Database from '../server/database/Database';

dotenv.config();
const port = process.env.PORT || 4000;

export const db = new Database();

app.listen(port);

export default app;
