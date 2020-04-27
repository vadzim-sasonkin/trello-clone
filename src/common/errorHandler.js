const HttpStatus = require('http-status-codes');

class AppHttpError extends Error {
  constructor(message) {
    super();

    Error.captureStackTrace(this, this.constructor);
    this.message = message;
  }
}

class NotFoundError extends AppHttpError {
  constructor(message) {
    super();
    this.message = message || 'Not found';
    this.status = HttpStatus.NOT_FOUND;
  }
}

class UnauthorizedError extends AppHttpError {
  constructor(message) {
    super();
    this.message = message || 'Unauthorized';
    this.status = HttpStatus.UNAUTHORIZED;
  }
}

class ForbiddenError extends AppHttpError {
  constructor(message) {
    super();
    this.message = message || 'Forbidden';
    this.status = HttpStatus.FORBIDDEN;
  }
}

function errorHandler(err, req, res, next) {
  if (err instanceof AppHttpError) {
    res.status(err.status);
    res.send(err.message);
  } else {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR);
    res.send('Something went wrong');
  }
  next(err);
}

module.exports = {
  errorHandler,
  NotFoundError,
  UnauthorizedError,
  ForbiddenError
};
