const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv/config');

app.use(cors());

app.use(express.json());
app.use(morgan('tiny'));
app.options('*', cors());

const base_url = process.env.APP_URL;

const productRouter = require('./routes/products');
const categoryRouter = require('./routes/categories');

// Routers
app.use(`${base_url}/products`, productRouter);
app.use(`${base_url}/categories`, categoryRouter);

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
