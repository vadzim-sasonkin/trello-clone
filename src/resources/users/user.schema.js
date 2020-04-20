const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: String,
  login: String,
  password: String
});

const User = mongoose.model('User', schema);

module.exports = User;
