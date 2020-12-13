const router = require("express").Router();

const auth = require('../middlewares/auth.js');

const validateUserRequest = require('../middlewares/validateUserRequest.js');

const validateParams = require('../middlewares/validateParams.js');

const {
  getUsers,
  getUser,
  createUser,
  login,
  getUserMe,
  updateUserProfile,
  updateUserAvatar,
} = require("../controllers/users.js");

router.post('/signin', validateUserRequest, login);

router.post('/signup', validateUserRequest, createUser);

router.get("/users/me", auth, getUserMe);

router.patch("/users/me", validateUserRequest, auth, updateUserProfile);

router.patch("/users/me/avatar", validateUserRequest, auth, updateUserAvatar);

router.get("/users/:id", validateParams, auth, getUser);

router.get("/users", auth, getUsers);

module.exports = router;
