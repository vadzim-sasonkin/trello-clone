const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('./config');

const getRandomDelay = (maxSeconds = 1000) => {
  return Math.random() * maxSeconds;
};

const saltRounds = 10;
const hashPass = password => {
  return bcrypt.hash(password, saltRounds);
};
const checkPass = (password, hash) => {
  return bcrypt.compare(password, hash);
};

const signJwt = (userId, login) => {
  return jwt.sign({ userId, login }, config.JWT_SECRET_KEY, {
    algorithm: 'HS256'
  });
};
const verifyJwt = token => {
  return jwt.verify(token, config.JWT_SECRET_KEY, { algorithms: ['HS256'] });
};

module.exports = { getRandomDelay, hashPass, checkPass, signJwt, verifyJwt };
