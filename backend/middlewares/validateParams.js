const { celebrate, Joi } = require('celebrate');

const validateParams = celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
});

module.exports = validateParams;
