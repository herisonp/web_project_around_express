const router = require('express').Router();
const fsPromises = require('fs').promises;
const path = require('path');

const USERS_PATH = path.join(__dirname, '../data/users.json');

function getUsers() {
  return fsPromises
    .readFile(USERS_PATH, { encoding: 'utf8' })
    .then((users) => JSON.parse(users));
}

function getUserById(id) {
  return getUsers().then((users) => users.find((user) => user._id === id));
}

router.get('/users', (req, res) => {
  getUsers()
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Ocorreu um erro' }));
});

router.get('/users/:id', (req, res) => {
  const { id } = req.params;
  getUserById(id)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'ID do usuário não encontrado' });
      }
      res.send({ data: user });
    })
    .catch(() => res.status(500).send({ message: 'Ocorreu um erro' }));
});

module.exports = router;
