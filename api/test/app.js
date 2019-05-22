/* eslint-disable linebreak-style */
import dotenv from 'dotenv';
import app from '../server/index';

dotenv.config();
const port = process.env.PORT || 4000;

app.listen(port);

export default app;
