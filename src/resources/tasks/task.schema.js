const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: String,
  order: Number,
  description: String,
  userId: mongoose.Types.ObjectId,
  boardId: mongoose.Types.ObjectId,
  columnId: mongoose.Types.ObjectId
});

const Task = mongoose.model('Task', schema);

module.exports = Task;
