/* eslint-disable linebreak-style */
/* eslint-disable import/no-extraneous-dependencies */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import dotenv from 'dotenv';
import app from '../api/server/index';
import Database from '../api/server/database/Database';

dotenv.config();
// const port = process.env.PORT || 4000;

export const db = new Database();

app.listen(process.env.PORT);

export default app;
