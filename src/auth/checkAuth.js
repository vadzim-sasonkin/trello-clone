const { UnauthorizedError } = require('../common/errorHandler');
const { verifyJwt } = require('../common/utils');

function checkAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new UnauthorizedError('No credentials sent!');
  }
  const [scheme, token] = authHeader.split(' ');
  if (scheme !== 'Bearer' || !token) {
    throw new UnauthorizedError('No credentials sent!');
  }
  try {
    const { id, login } = verifyJwt(token);
    req.user = { id, login };
  } catch (error) {
    throw new UnauthorizedError('Credentials incorrect!');
  }

  next();
}

module.exports = checkAuth;
