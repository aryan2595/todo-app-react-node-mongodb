const bcrypt = require("bcryptjs");

exports.userSetJson = {
  transform: (doc, res) => {
    delete res._id;
    delete res.createdAt;
    delete res.updatedAt;
    delete res.password;
  },
  getters: true,
};

exports.todoSetJson = {
  transform: (doc, res) => {
    delete res._id;
    delete res.createdAt;
    delete res.updatedAt;
  },
  getters: true,
};

exports.encryptPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  return hash;
};
