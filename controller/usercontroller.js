const userservice = require("../service/userservice");
const { bcryptConfig } = require("../appConfig");
const bcrypt = require("bcrypt");

const addUserAsync = async (req, res) => {
  //check username not in db
  let dbResult = await userservice.getUserbyNameAsync(req.body.username);
  if (dbResult.isSuccess && dbResult.data.id > 0) {
    res.sendCommonValue({}, "Username already exists", 400, 400);
    return;
  }

  let user = {};
  user.username = req.body.username;
  user.password = req.body.password;
  user.email = req.body.email;
  user.address = req.body.address;
  user.age = req.body.age;
  user.gender = req.body.gender;

  let password = req.body.password;
  //encryption password
  //let salt = await bcrypt.genSalt(bcryptConfig.saltRounds);
  //console.log(salt);
  let encrypPassword = await bcrypt.hashSync(user.password, bcryptConfig.salt);
  user.password = encrypPassword;
  let result = await userservice.addUserAsync(user);
  if (result.isSuccess) {
    user.password = password;
    res.sendCommonValue(user, "success", 1);
  } else {
    res.sendCommonValue({}, "", 0);
  }
};

const getUserAsync = async (req, res) => {
  let dbResult = await userservice.getUserbyNameAsync(req.query.username);
  let user = dbResult.data;
  res.sendCommonValue(
        user,
        "successful",
        1
    );
};

const getUserListAsync = async (req, res) => {
  let page = parseInt(req.params.page);
  let pageSize = parseInt(req.params.pageSize);
  let result = await userservice.getUserListAsync(page, pageSize);
  if (result.isSuccess) {
    res.sendCommonValue(result.data, "success", 1);
  } else {
    res.sendCommonValue([], "failed", 0);
  }
};

const deUserByIdAsync = async (req, res) => {
  let ids = req.params.ids;
  let result = await userservice.delUserByIdAsync(ids);
  if (result.isSuccess) {
    res.sendCommonValue({}, "success", 1);
  } else {
    res.sendCommonValue({}, "failed", 0);
  }
};

const updateUserAsync = async (req, res) => {
  //check username not in db
  let user = {};
  user.id = req.body.id;
  user.username = req.body.username;
  user.email = req.body.email;
  user.address = req.body.address;
  user.age = req.body.age;
  user.gender = req.body.gender;

  let checkUserResult = await userservice.checkUserNameAsync(
    user.username,
    user.id
  );
  if (!checkUserResult.isSuccess) {
    res.sendCommonValue({}, "Username and User ID do not exists", 400, 400);
    return;
  }
  let dbResult = await userservice.uptUserByIdAsync(user);
  if (dbResult.isSuccess) {
    res.sendCommonValue(user, "Updated user succeed", 1);
    return;
  } else {
    res.sendCommonValue({}, "", 0);
  }
};

const getUserByIdAsync = async (req, res) => {
  let id = parseInt(req.query.id);
  let result = await userservice.getUserbyIdAsync(id);
  if (result.isSuccess) {
    res.sendCommonValue(result.data, "success", 1);
  } else {
    res.sendCommonValue([], "failed", 0);
  }
};

module.exports = {
  addUserAsync,
  getUserAsync,
  getUserListAsync,
  deUserByIdAsync,
  updateUserAsync,
  getUserByIdAsync
};
