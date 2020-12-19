const Card = require('../models/cards');
const customError = require('../utils/error.js');

// Вернуть все карточки

module.exports.getCards = (req, res, next) => {
  Card.find()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      customError(err, res, next);
    });
};

// Создание карточки

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      customError(err, res, next);
    });
};

// Удалить карточку

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.id)
    .then((card) => {
      if (!card) {
        const error = new Error('Нет такой карточки');
        error.statusCode = 404;
        throw error;
      } if (!card.owner.equals(req.user._id)) {
        const error = new Error('У вас нет таких прав');
        error.statusCode = 403;
        throw error;
      }
      return Card.findByIdAndRemove(req.params.id);
    })
    .then((card) => res.status(200).send({ data: card }))
    .catch(next);
};

// Добавить лайк

module.exports.likeCard = (req, res, next) => {
  Card.findById(req.params.id)
    .then((card) => {
      if (!card) {
        const error = new Error('Нет такой карточки');
        error.statusCode = 404;
        throw error;
      }
      return Card.findByIdAndUpdate(req.params.id,
        { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
        { new: true })
        .then((newCard) => {
          res.status(200).send(newCard);
        });
    })
    .catch((err) => {
      next(err);
    });
};

// Удалить лайк

module.exports.dislikeCard = (req, res, next) => {
  Card.findById(req.params.id)
    .then((card) => {
      if (!card) {
        const error = new Error('Нет такой карточки');
        error.statusCode = 404;
        throw error;
      }
      return Card.findByIdAndUpdate(req.params.id,
        { $pull: { likes: req.user._id } }, // убрать _id из массива
        { new: true })
        .then((newCard) => {
          res.status(200).send(newCard);
        });
    })
    .catch((err) => {
      next(err);
    });
};
