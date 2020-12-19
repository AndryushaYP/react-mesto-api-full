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
        const error = new Error('Пользователя с таким ID не существует');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      next(err);
    });
};

// Регистрация

module.exports.createUser = (req, res, next) => {
  const { email } = req.body;
  User.findOne({ email })
    .then((data) => {
      if (data) {
        const error = new Error('Пользователь с таким email уже существует');
        error.statusCode = 409;
        throw error;
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
          next(err);
        });
    }).catch((err) => {
      next(err);
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
      next(err);
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
    const error = new Error('Заполните оба поля');
    error.statusCode = 400;
    throw error;
  }
  User.findByIdAndUpdate(req.user._id, { name: req.body.name, about: req.body.about },
    { new: true })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(next);
};

// Обновить аватар текущего пользователя

module.exports.updateUserAvatar = (req, res, next) => {
  if (!req.body.avatar) {
    const error = new Error('Введите ссылку на аватар');
    error.statusCode = 400;
    throw error;
  }
  User.findByIdAndUpdate(req.user._id, { avatar: req.body.avatar }, { new: true })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(next);
};
