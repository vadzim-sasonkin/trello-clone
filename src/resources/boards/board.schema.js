const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: String,
  columns: [{ title: String, order: Number }]
});

const Board = mongoose.model('Board', schema);

module.exports = Board;
