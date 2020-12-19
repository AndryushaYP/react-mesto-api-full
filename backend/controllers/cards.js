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
        return res.status(404).send({ message: 'Нет такой карточки' });
      } if (!card.owner.equals(req.user._id)) {
        return res.status(403).send({ message: 'У вас нет таких прав' });
      }
      return Card.findByIdAndRemove(req.params.id);
    })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      customError(err, res, next);
    });
};

// Добавить лайк

module.exports.likeCard = (req, res, next) => {
  Card.findById(req.params.id)
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Нет такой карточки' });
      }
    });
  Card.findByIdAndUpdate(req.params.id,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true })
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      customError(err, res, next);
    });
};

// Удалить лайк

module.exports.dislikeCard = (req, res, next) => {
  Card.findById(req.params.id)
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Нет такой карточки' });
      }
    });
  Card.findByIdAndUpdate(req.params.id,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true })
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      customError(err, res, next);
    });
};
