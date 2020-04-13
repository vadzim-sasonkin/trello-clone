const router = require('express').Router();
const Task = require('./task.model');
const tasksService = require('./task.service');
const wrapAsync = require('../../common/wrap-async');
const HttpStatus = require('http-status-codes');
const { NotFoundError } = require('../../common/errorHandler');

router.route('/').get(
  wrapAsync(async (req, res, next) => {
    const tasks = await tasksService.getAllByBoardId(res.locals.boardId);
    if (tasks) {
      res.json(tasks.map(Task.toResponse));
    } else {
      return next(new Error());
    }
  })
);

router.route('/').post(
  wrapAsync(async (req, res, next) => {
    const created = await tasksService.create({
      ...req.body,
      boardId: res.locals.boardId
    });
    if (created) {
      res.json(Task.toResponse(created));
    } else {
      return next(new Error());
    }
  })
);

router.route('/:id').get(
  wrapAsync(async (req, res, next) => {
    const task = await tasksService.get(req.params.id);
    if (task) {
      res.json(Task.toResponse(task));
    } else {
      return next(new NotFoundError());
    }
  })
);

router.route('/:id').put(
  wrapAsync(async (req, res, next) => {
    const updated = await tasksService.update(
      { ...req.body, boardId: res.locals.boardId },
      req.params.id
    );
    if (updated) {
      res.json(Task.toResponse(updated));
    } else {
      return next(new NotFoundError());
    }
  })
);

router.route('/:id').delete(
  wrapAsync(async (req, res, next) => {
    const result = await tasksService.delete(req.params.id);
    if (result) {
      res.status(HttpStatus.NO_CONTENT).end();
    } else {
      return next(new NotFoundError());
    }
  })
);

module.exports = router;
