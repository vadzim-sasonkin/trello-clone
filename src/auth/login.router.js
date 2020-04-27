const router = require('express').Router();
const wrapAsync = require('../common/wrap-async');
const loginService = require('./login.service');
const { UnauthorizedError } = require('../common/errorHandler');

router.route('/').post(
  wrapAsync(async (req, res, next) => {
    const { login, password } = req.body;
    const token = await loginService.login({ login, password });
    if (!token) {
      return next(new UnauthorizedError('Wrong login or password'));
    }
    return res.json({ token });
  })
);

module.exports = router;
