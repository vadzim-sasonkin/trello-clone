const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const wrapAsync = require('../../common/wrap-async');
const HttpStatus = require('http-status-codes');
const { NotFoundError } = require('../../common/errorHandler');

router.route('/').get(
  wrapAsync(async (req, res) => {
    const users = await usersService.getAll();
    res.json(users.map(User.toResponse));
  })
);

router.route('/').post(
  wrapAsync(async (req, res, next) => {
    const createdUser = await usersService.create(req.body);
    if (createdUser) {
      res.json(User.toResponse(createdUser));
    } else {
      return next(new Error());
    }
  })
);

router.route('/:id').get(
  wrapAsync(async (req, res, next) => {
    const user = await usersService.get(req.params.id);
    if (user) {
      res.json(User.toResponse(user));
    } else {
      return next(new NotFoundError());
    }
  })
);

router.route('/:id').put(
  wrapAsync(async (req, res, next) => {
    const updatedUser = await usersService.update(req.body, req.params.id);
    if (updatedUser) {
      res.json(User.toResponse(updatedUser));
    } else {
      return next(new NotFoundError());
    }
  })
);

router.route('/:id').delete(
  wrapAsync(async (req, res, next) => {
    const result = await usersService.delete(req.params.id);
    if (result) {
      res.status(HttpStatus.NO_CONTENT).end();
    } else {
      return next(new NotFoundError());
    }
  })
);

module.exports = router;
