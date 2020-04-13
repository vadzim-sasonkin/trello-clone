const Task = require('./task.model');
const { getRandomDelay } = require('../../common/utils');

const tasks = [];

const getAll = async () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(tasks);
    }, getRandomDelay());
  });
};

const getAllByBoardId = async boardId => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(tasks.filter(task => task.boardId === boardId));
    }, getRandomDelay());
  });
};

const get = async id => {
  return tasks.find(task => task.id === id);
};

const create = async model => {
  const task = new Task({ ...model });
  return new Promise(resolve => {
    tasks.push(task);
    resolve(task);
  });
};

const update = async model => {
  const { id, ...restFields } = model;
  const task = tasks.find(item => item.id === id);
  if (!task) return;
  task.update(restFields);
  return task;
};

const del = async id => {
  const taskIndex = tasks.findIndex(item => item.id === id);
  if (taskIndex === -1) return;
  tasks.splice(taskIndex, 1);
  return true;
};

module.exports = { getAll, getAllByBoardId, get, create, update, delete: del };
