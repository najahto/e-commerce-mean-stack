const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv/config');
const authJwt = require('./middleware/auth-jwt');

app.use(cors());

app.use(express.json());
app.use(morgan('tiny'));
app.use(authJwt());

app.options('*', cors());

const base_url = process.env.APP_URL;

const productRouter = require('./routes/products');
const categoryRouter = require('./routes/categories');
const userRouter = require('./routes/users');
const authJWT = require('./middleware/auth-jwt');

// Routers
app.use(`${base_url}/products`, productRouter);
app.use(`${base_url}/categories`, categoryRouter);
app.use(`${base_url}/users`, userRouter);

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

app.listen(3000, () => {
  console.log('server is running ');
});
