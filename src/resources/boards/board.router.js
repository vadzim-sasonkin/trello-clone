const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');
const wrapAsync = require('../../common/wrap-async');
const HttpStatus = require('http-status-codes');
const { NotFoundError } = require('../../common/errorHandler');
const taskRouter = require('../tasks/task.router');

router.use(
  '/:id/tasks',
  (req, res, next) => {
    res.locals.boardId = req.params.id;
    next();
  },
  taskRouter
);

router.route('/').get(
  wrapAsync(async (req, res) => {
    const boards = await boardsService.getAll();
    res.json(boards.map(Board.toResponse));
  })
);
router.route('/').post(
  wrapAsync(async (req, res, next) => {
    const created = await boardsService.create(req.body);
    if (created) {
      res.json(Board.toResponse(created));
    } else {
      return next(new Error());
    }
  })
);

router.route('/:id').get(
  wrapAsync(async (req, res, next) => {
    const board = await boardsService.get(req.params.id);
    if (board) {
      res.json(Board.toResponse(board));
    } else {
      return next(new NotFoundError());
    }
  })
);

router.route('/:id').put(
  wrapAsync(async (req, res, next) => {
    const updated = await boardsService.update(req.body, req.params.id);
    if (updated) {
      res.json(Board.toResponse(updated));
    } else {
      return next(new NotFoundError());
    }
  })
);

router.route('/:id').delete(
  wrapAsync(async (req, res, next) => {
    const result = await boardsService.delete(req.params.id);
    if (result) {
      res.status(HttpStatus.NO_CONTENT).end();
    } else {
      return next(new NotFoundError());
    }
  })
);

module.exports = router;
