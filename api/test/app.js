import 'core-js/stable';
import 'regenerator-runtime/runtime';
import dotenv from 'dotenv';
import app from '../server/index';
import Database from '../server/database/Database';

dotenv.config();
// const port = process.env.PORT || 4000;

export const db = new Database();

app.listen(process.env.PORT);

export default app;
