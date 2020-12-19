const router = require('express').Router();

const usersRouter = require('./users.js');
const cardsRouter = require('./cards.js');

module.exports = router.use(
  usersRouter,
  cardsRouter,
);
