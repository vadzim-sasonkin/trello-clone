const bcrypt = require('bcrypt');

const getRandomDelay = (maxSeconds = 1000) => {
  return Math.random() * maxSeconds;
};

const saltRounds = 10;
const hashPass = password => {
  return bcrypt.hash(password, saltRounds);
};

module.exports = { getRandomDelay, hashPass };
