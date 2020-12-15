const customError = (err, res, next) => {
  if (err.name === 'CastError') {
    const castError = new Error("Неверный ID");
    castError.statusCode = 404;
    next(castError);
  } else if (err.name === 'ValidationError') {
    const validationError = new Error(err.message);
    validationError.statusCode = 400;
    next(validationError);
  } else if (err.name === 'UnauthorizedError') {
    const unauthorizedError = new Error("Ошибка авторизации. Неверный логин или пароль");
    unauthorizedError.statusCode = 401;
    next(unauthorizedError);
  } else {
    res.status(500).send({ message: "Что-то пошло не так!" });
  }
};

module.exports = customError;
