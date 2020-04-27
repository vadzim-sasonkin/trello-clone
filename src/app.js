const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const authRouter = require('./auth/login.router');
const { logger, errorLogger } = require('./common/logger');
const { errorHandler } = require('./common/errorHandler');
const checkAuth = require('./auth/checkAuth');

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

app.use('/login', authRouter);
app.use('/users', checkAuth, userRouter);
app.use('/boards', checkAuth, boardRouter);
app.use('/tasks', checkAuth, taskRouter);

app.use(errorLogger);
app.use(errorHandler);

module.exports = app;
