const usersRepo = require(`./user.${process.env.store_type}.repository`);
const tasksService = require('../tasks/task.service');
const { hashPass } = require('../../common/utils');

const getAll = () => usersRepo.getAll();
const get = id => usersRepo.get(id);
const create = async ({ password, ...restModel }) => {
  const hashedPass = await hashPass(password);
  return usersRepo.create({ password: hashedPass, ...restModel });
};
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
