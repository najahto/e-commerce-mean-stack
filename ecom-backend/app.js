const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');

require('dotenv/config');

app.use(express.json());
app.use(morgan('tiny'));

const base_url = process.env.APP_URL;

app.get(`${base_url}/`, (req, res) => {
  res.send({ name: 'omar', age: 12 });
});

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
