const resourceRepo = require(`./task.${process.env.store_type}.repository`);

const getAll = () => resourceRepo.getAll();
const getAllByBoardId = id => resourceRepo.getAllByBoardId(id);
const get = id => resourceRepo.get(id);
const create = model => resourceRepo.create(model);
const update = (model, id) => resourceRepo.update({ ...model, id });
const del = id => resourceRepo.delete(id);

module.exports = { getAll, getAllByBoardId, get, create, update, delete: del };
