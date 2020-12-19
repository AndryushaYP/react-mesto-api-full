const router = require('express').Router();

const validateCardsRequest = require('../middlewares/validateCardsRequest.js');

const validateParams = require('../middlewares/validateParams.js');

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards.js');

const auth = require('../middlewares/auth.js');

router.get('/cards', validateParams, auth, getCards);

router.post('/cards', validateCardsRequest, auth, createCard);

router.put('/cards/:id/likes', validateParams, auth, likeCard);

router.delete('/cards/:id/likes', validateParams, auth, dislikeCard);

router.delete('/cards/:id', validateParams, auth, deleteCard);

module.exports = router;
