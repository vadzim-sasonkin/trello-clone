const mongoose = require('mongoose');

const dbInit = () => {
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));

  return mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
};

module.exports = dbInit;
