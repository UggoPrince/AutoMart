/* eslint-disable linebreak-style */
import express from 'express';
import bodyParser from 'body-parser';
import usersRouter from './routes/usersRoutes';
import carsRouter from './routes/carsRoutes';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1/', usersRouter);
app.use('/api/v1/', carsRouter);

app.use((req, res) => {
  res.status(404).json('Not Found');
});

export default app;