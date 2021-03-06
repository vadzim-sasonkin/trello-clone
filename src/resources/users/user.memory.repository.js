const User = require('./user.model');
const { getRandomDelay } = require('../../common/utils');

const users = [];

const getAll = async () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(users);
    }, getRandomDelay());
  });
};

const get = async id => {
  return users.find(user => user.id === id);
};

const getByLogin = login => {
  return users.find(user => user.login === login);
};

const create = async model => {
  const user = new User({ ...model });
  return new Promise(resolve => {
    users.push(user);
    resolve(user);
  });
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
  if (userIndex === -1) return;
  users.splice(userIndex, 1);
  return true;
};

module.exports = { getAll, get, getByLogin, create, update, delete: del };
