/* eslint-disable linebreak-style */
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import usersRouter from './routes/usersRoutes';
import carsRouter from './routes/carsRoutes';
import ordersRouter from './routes/ordersRoutes';

// Set up express app
const app = express();

// Log request to console
app.use(logger('dev'));

// Parse incoming request data
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1/', usersRouter);
app.use('/api/v1/', carsRouter);
app.use('/api/v1/', ordersRouter);

app.use((req, res) => {
  res.status(404).json('Not Found');
});

export default app;
