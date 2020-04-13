const morgan = require('morgan');

morgan.token('route-params', req => {
  return JSON.stringify(req.params);
});
morgan.token('body', req => {
  return JSON.stringify(req.body);
});
morgan.token('error', req => {
  return JSON.stringify(req && req.error);
});

const logger = morgan((tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens['route-params'](req, res),
    tokens.body(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'),
    '-',
    tokens.error(req, res),
    '-',
    tokens['response-time'](req, res),
    'ms'
  ].join(' ');
});

const errorLogger = (err, req, res, next) => {
  req.error = err;
  // console.error(err);
  next(err);
};

module.exports = { logger, errorLogger };
