const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

const HttpStatus = require('http-status-codes');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
});

router.route('/').post(async (req, res) => {
  const createdUser = await usersService.create(req.body);
  if (createdUser) {
    res.json(User.toResponse(createdUser));
  } else {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR);
  }
});

router.route('/:id').get(async (req, res) => {
  const user = await usersService.get(req.params.id);
  if (user) {
    res.json(User.toResponse(user));
  } else {
    res.status(HttpStatus.NOT_FOUND).send({ error: 'Not found' });
  }
});

router.route('/:id').put(async (req, res) => {
  const updatedUser = await usersService.update(req.body, req.params.id);
  if (updatedUser) {
    res.json(User.toResponse(updatedUser));
  } else {
    res.status(HttpStatus.NOT_FOUND).end();
  }
});

router.route('/:id').delete(async (req, res) => {
  const result = await usersService.delete(req.params.id);
  if (result) {
    res.status(HttpStatus.NO_CONTENT).end();
  } else {
    res.status(HttpStatus.NOT_FOUND);
  }
});

module.exports = router;
