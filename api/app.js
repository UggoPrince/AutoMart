/* eslint-disable linebreak-style */
/* eslint-disable no-console */
import dotenv from 'dotenv';
import app from './server/index';

dotenv.config();
const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`App listening on port ${port}!`));
