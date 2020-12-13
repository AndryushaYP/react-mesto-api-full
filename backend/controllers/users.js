const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const User = require("../models/user");
const customError = require("../utils/error.js");

// Список всех пользователей

module.exports.getUsers = (req, res, next) => {
  User.find()
    .then((data) => {
      res.send(data);
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
      res.send(user);
    })
    .catch((err) => {
      customError(err, res, next);
    });
};

// Регистрация

module.exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
      email: req.body.email,
      password: hash,
    }))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      customError(err, res, next);
    });
};

// Авторизация

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => {
      customError(err, res, next);
    });
};

// Возвращаем текущего пользователя

module.exports.getUserMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      customError(err, res, next);
    });
};

// Обновить профиль текущего пользователя

module.exports.updateUserProfile = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, { name: req.body.name, about: req.body.about })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      customError(err, res, next);
    });
};

// Обновить аватар текущего пользователя

module.exports.updateUserAvatar = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, { avatar: req.body.avatar })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      customError(err, res, next);
    });
};
