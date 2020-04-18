const isDb = true;

const usersRepo = isDb
  ? require('./user.db.repository')
  : require('./user.memory.repository');
const tasksService = require('../tasks/task.service');

const getAll = () => usersRepo.getAll();
const get = id => usersRepo.get(id);
const create = model => usersRepo.create(model);
const update = (model, id) => usersRepo.update({ ...model, id });
const del = async id => {
  const tasks = await tasksService.getAll();
  return Promise.all([
    usersRepo.delete(id),
    ...tasks.map(task =>
      tasksService.update({ ...task, userId: null }, task.id)
    )
  ]).then(results => {
    return results[0];
  });
};

module.exports = { getAll, get, create, update, delete: del };
