const Board = require('./board.schema');

const getAll = async () => {
  const boards = await Board.find();
  return boards || [];
};

const get = async id => {
  return await Board.findById(id);
};

const create = async model => {
  const board = new Board(model);
  return await board.save();
};

const update = async model => {
  const board = await Board.findById(model.id);
  board.set(model);
  return await board.save();
};

const del = async id => {
  return await Board.deleteOne({ _id: id });
};

module.exports = { getAll, get, create, update, delete: del };
