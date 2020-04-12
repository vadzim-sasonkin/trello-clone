const User = require('./user.model');

const users = [];

const getAll = async () => {
  return users;
};

const get = async id => {
  return users.find(user => user.id === id);
};

const create = async model => {
  const user = new User({ ...model });
  users.push(user);
  return user;
};

const update = async model => {
  const { id, ...restFields } = model;
  const user = users.find(item => item.id === id);
  if (!user) return;
  user.update(restFields);
  return user;
};

const del = async id => {
  const userIndex = users.findIndex(item => item.id === id);
  if (!userIndex) return;
  users.splice(userIndex, 1);
  return true;
};

module.exports = { getAll, get, create, update, delete: del };
