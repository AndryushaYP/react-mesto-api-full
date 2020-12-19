const { celebrate, Joi } = require('celebrate');

module.exports.validateUserRequest = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2),
    avatar: Joi.string(),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }).unknown(true),
});

module.exports.validateUserRequestPatch = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2),
    avatar: Joi.string().uri(),
  }).unknown(true),
});
