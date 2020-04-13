const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const { logger, errorLogger } = require('./common/logger');
const { errorHandler } = require('./common/errorHandler');

process.on('uncaughtException', err => {
  console.error('<!> Exception %s: ', err.message, err.stack);
});

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(logger);

app.use(express.json());
app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);

app.use(errorLogger);
app.use(errorHandler);

module.exports = app;
