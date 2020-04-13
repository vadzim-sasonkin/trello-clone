const getRandomDelay = (maxSeconds = 1000) => {
  return Math.random() * maxSeconds;
};

module.exports = { getRandomDelay };
