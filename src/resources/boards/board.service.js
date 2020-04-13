const resourceRepo = require('./board.memory.repository');
const tasksRepo = require('../tasks/task.memory.repository');

const getAll = () => resourceRepo.getAll();
const get = id => resourceRepo.get(id);
const create = model => resourceRepo.create(model);
const update = (model, id) => resourceRepo.update({ ...model, id });
const del = async id => {
  const boardTasks = await tasksRepo.getAllByBoardId(id);
  return Promise.all([
    resourceRepo.delete(id),
    ...boardTasks.map(task => tasksRepo.delete(task.id))
  ]).then(results => {
    return results[0];
  });
};

module.exports = { getAll, get, create, update, delete: del };
