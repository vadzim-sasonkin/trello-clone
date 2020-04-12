const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();
const get = id => usersRepo.get(id);
const create = model => usersRepo.create(model);
const update = (model, id) => usersRepo.update({ ...model, id });
const del = id => usersRepo.delete(id);

module.exports = { getAll, get, create, update, delete: del };
