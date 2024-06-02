const express = require('express');
const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');

const { PORT = 3000 } = process.env;

const app = express();

// Routes
app.use('/', routerUsers);
app.use('/', routerCards);

// Not-found
app.use('/', (req, res) => {
  res.status(404).send({ message: 'A solicitação não foi encontrada' });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
