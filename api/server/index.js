import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import swaggerSpec from './swaggerDocs/config/swaggerDef';
import usersRouter from './routes/usersRoutes';
import carsRouter from './routes/carsRoutes';
import ordersRouter from './routes/ordersRoutes';
import flagsRouter from './routes/flagsRoutes';

// Set up express app
const app = express();

app.use(cors()); // for cross origin requests
app.use(logger('dev')); // Log request to console

// produce api documentation
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});
app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// HOME PAGE
app.get('/', (req, res) => {
  res.status(200).send('<h1>Welcome to AutoMart API.</h1>'
  + '<span>Here is the documentation of version 1.0'
  + ' <a href="https://automarter.herokuapp.com/api/v1/api-docs/" target="blank">'
  + 'automarter.herokuapp.com/api/v1/api-docs/</a></span>');
});

// Parse incoming request data
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: true }));

// app.options('*', cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});
app.use('/api/v1/', usersRouter);
app.use('/api/v1/', carsRouter);
app.use('/api/v1/', ordersRouter);
app.use('/api/v1/', flagsRouter);

app.use((req, res) => {
  res.status(404).json('Not Found');
});

export default app;
