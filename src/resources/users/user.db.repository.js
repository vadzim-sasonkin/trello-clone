const User = require('./user.schema');

const getAll = async () => {
  const users = await User.find();
  return users || [];
};

const get = async id => {
  return await User.findById(id);
};

const create = async model => {
  const newUser = new User(model);
  return await newUser.save();
};

const update = async model => {
  const user = await User.findById(model.id);
  user.set(model);
  return await user.save();
};

const del = async id => {
  return await User.deleteOne({ _id: id });
};

module.exports = { getAll, get, create, update, delete: del };
