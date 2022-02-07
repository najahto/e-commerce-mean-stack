const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');
const authJwt = require('./middleware/auth-jwt');
const errorHandler = require('./helpers/error-handler');

app.use(cors());
app.options('*', cors());

// middleware
app.use(express.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use(errorHandler);

const base_url = process.env.APP_URL;

// Routers
const productRouter = require('./routes/products');
const categoryRouter = require('./routes/categories');
const userRouter = require('./routes/users');
const orderRouter = require('./routes/orders');

app.use(`${base_url}/products`, productRouter);
app.use(`${base_url}/categories`, categoryRouter);
app.use(`${base_url}/users`, userRouter);
app.use(`${base_url}/orders`, orderRouter);

// Database connection
mongoose
  .connect(process.env.CONNECTION_STRING, {
    dbName: 'e-shopdb',
  })
  .then(() => {
    console.log('Database connection is ready ...');
  })
  .catch((err) => {
    console.log(err);
  });

// server
app.listen(3000, () => {
  console.log('server is running ');
});
