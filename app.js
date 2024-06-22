const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '667609cb8628f5ed2583e7c7',
  };

  next();
});

// Routes
app.use('/', routerUsers);
app.use('/', routerCards);

// Not-found
app.use('/', (req, res) => {
  res.status(404).send({ message: 'A solicitação não foi encontrada' });
});

mongoose
  .connect('mongodb://localhost:27017/aroundb')
  .then(() => {
    console.log(`MongoDB connected...`);

    // start server
    app.listen(PORT, () => {
      console.log(`listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
