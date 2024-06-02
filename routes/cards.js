const router = require('express').Router();
const fsPromises = require('fs').promises;
const path = require('path');

const CARDS_PATH = path.join(__dirname, '../data/cards.json');

function getCards() {
  return fsPromises
    .readFile(CARDS_PATH, { encoding: 'utf8' })
    .then((cards) => JSON.parse(cards));
}

router.get('/cards', (req, res) => {
  getCards()
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'Ocorreu um erro' }));
});

module.exports = router;
