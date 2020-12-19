const router = require('express').Router();

const auth = require('../middlewares/auth.js');

const { validateUserRequest, validateUserRequestPatch } = require('../middlewares/validateUserRequest.js');

const validateParams = require('../middlewares/validateParams.js');

const {
  getUsers,
  getUser,
  createUser,
  login,
  getUserMe,
  updateUserProfile,
  updateUserAvatar,
} = require('../controllers/users.js');

router.post('/signin', validateUserRequest, login);

router.post('/signup', validateUserRequest, createUser);

router.get('/users/me', validateParams, auth, getUserMe);

router.patch('/users/me', validateUserRequestPatch, auth, updateUserProfile);

router.patch('/users/me/avatar', validateUserRequestPatch, auth, updateUserAvatar);

router.get('/users/:id', validateParams, auth, getUser);

router.get('/users', auth, getUsers);

module.exports = router;
