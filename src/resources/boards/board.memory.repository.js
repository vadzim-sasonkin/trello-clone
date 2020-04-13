const Board = require('./board.model');
const { getRandomDelay } = require('../../common/utils');

const boards = [];

const getAll = async () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(boards);
    }, getRandomDelay());
  });
};

const get = async id => {
  return boards.find(board => board.id === id);
};

const create = async model => {
  const board = new Board({ ...model });
  return new Promise(resolve => {
    boards.push(board);
    resolve(board);
  });
};

const update = async model => {
  const { id, ...restFields } = model;
  const board = boards.find(item => item.id === id);
  if (!board) return;
  board.update(restFields);
  return board;
};

const del = async id => {
  const boardIndex = boards.findIndex(item => item.id === id);
  if (boardIndex === -1) {
    return;
  }
  boards.splice(boardIndex, 1);
  return true;
};

module.exports = { getAll, get, create, update, delete: del };
