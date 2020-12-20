const router = require('express').Router();

const usersRouter = require('./users.js');
const cardsRouter = require('./cards.js');

const unknownPathRouter = router.use('*', () => {
  const error = new Error('Запрашиваемый ресурс не найден');
  error.statusCode = 404;
  throw error;
});

module.exports = router.use(
  unknownPathRouter,
  usersRouter,
  cardsRouter,
);
