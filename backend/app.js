const express = require("express");
const mongoose = require("mongoose");
const { errors } = require('celebrate');
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./routes/index.js");
const { requestLogger, errorLogger } = require('./middlewares/logger');

const PORT = 3003;
const app = express();

mongoose.connect("mongodb://localhost:27017/mestodb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

app.use(bodyParser.json());

app.use(cors());

app.use(requestLogger);

app.use(routes);

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  res.status(err.statusCode).send({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту: ${PORT}`);
});
