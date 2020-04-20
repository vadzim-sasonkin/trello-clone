const Task = require('./task.schema');

const getAll = async () => {
  const tasks = await Task.find();
  return tasks || [];
};

const get = async id => {
  return await Task.findById(id);
};

const getAllByBoardId = async boardId => {
  return await Task.find({ boardId });
};

const create = async model => {
  const task = new Task(model);
  return await task.save();
};

const update = async model => {
  const task = await Task.findById(model.id);
  task.set(model);
  return await task.save();
};

const del = async id => {
  return await Task.deleteOne({ _id: id });
};

module.exports = { getAll, get, getAllByBoardId, create, update, delete: del };
