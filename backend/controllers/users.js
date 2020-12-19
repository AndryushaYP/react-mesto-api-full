const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const User = require('../models/user');
const customError = require('../utils/error.js');

// Список всех пользователей

module.exports.getUsers = (req, res, next) => {
  User.find()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      customError(err, res, next);
    });
};

// Находим пользователя по id

module.exports.getUser = (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'Нет пользователя с таким ID' });
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      customError(err, res, next);
    });
};

// Регистрация

module.exports.createUser = (req, res, next) => {
  const { email } = req.body;
  User.findOne({ email })
    .then((data) => {
      if (data) {
        res.status(409).send({ message: 'Пользователь с таким email уже существует' });
      }
      bcrypt.hash(req.body.password, 10)
        .then((hash) => User.create({
          name: req.body.name,
          about: req.body.about,
          avatar: req.body.avatar,
          email: req.body.email,
          password: hash,
        }))
        .then((user) => res.status(200).send(user))
        .catch((err) => {
          customError(err, res, next);
        });
    });
};

// Авторизация

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      res.status(200).send({ token });
    })
    .catch((err) => {
      customError(err, res, next);
    });
};

// Возвращаем текущего пользователя

module.exports.getUserMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      customError(err, res, next);
    });
};

// Обновить профиль текущего пользователя

module.exports.updateUserProfile = (req, res, next) => {
  if (!req.body.name || !req.body.about) {
    res.status(400).send({ message: 'Заполните оба поля' });
  }
  User.findByIdAndUpdate(req.user._id, { name: req.body.name, about: req.body.about },
    { new: true })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      customError(err, res, next);
    });
};

// Обновить аватар текущего пользователя

module.exports.updateUserAvatar = (req, res, next) => {
  if (!req.body.avatar) {
    res.status(400).send({ message: 'Введите ссылку на аватар' });
  }
  User.findByIdAndUpdate(req.user._id, { avatar: req.body.avatar }, { new: true })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      customError(err, res, next);
    });
};
