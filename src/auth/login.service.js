const userService = require('../resources/users/user.service');
const { checkPass, signJwt } = require('../common/utils');

const login = async ({ login: loginText, password }) => {
  const user = await userService.getByLogin(loginText);
  if (!user) {
    return false;
  }
  const isPassCorrect = await checkPass(password, user.password);
  if (!isPassCorrect) {
    return false;
  }
  return signJwt(user.id, user.login);
};

module.exports = { login };
