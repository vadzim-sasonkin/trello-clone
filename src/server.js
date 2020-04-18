const { PORT } = require('./common/config');
const app = require('./app');
const dbInit = require('./common/db');

dbInit().then(() =>
  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  )
);
