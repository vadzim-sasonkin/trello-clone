const HttpStatus = require('http-status-codes');

class NotFoundError extends Error {
  constructor(message) {
    super();

    Error.captureStackTrace(this, this.constructor);
    this.message = message || 'Not found';
    this.status = HttpStatus.NOT_FOUND;
  }
}

function errorHandler(err, req, res, next) {
  if (err instanceof NotFoundError) {
    res.status(err.status);
    res.send(err.message);
  } else {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR);
    res.send('Something went wrong');
  }
  next(err);
}

module.exports = { errorHandler, NotFoundError };
