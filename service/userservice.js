const userModel = require("../model/user");
const { Op, where} = require("sequelize");

var getUserbyNameAsync = async (name) => {
  let queryUser = await userModel.findAll({ where: { username: name } });

  let user = { id: 0 };
  if (queryUser != null&&queryUser.length>0) {
    let oneUser=queryUser[0]
    user.id = oneUser.id;
    user.username = oneUser.username;
    user.password = oneUser.password;
    user.email = oneUser.email;
    user.age = oneUser.age;
    user.gender = oneUser.gender;
  }

  return { isSuccess: true, message: "", data: user };
};

var addUserAsync = async (user) => {
  let newuser= await userModel.create({
    username: user.username,
    password: user.password,
    email: user.email,
    age: user.age,
    gender: user.gender
  });
  return { isSuccess: true, message: "" };
};

var getUserListAsync = async (page, pageSize) => {
  let total = await userModel.count();
  if (total == 0) {
    return { isSuccess: true, message: "", data: { items: [], total: 0 } };
  }
  let {count, rows} = await userModel.findAndCountAll({limit: pageSize, offset: (page-1) * pageSize});

  let userlist = [];
  if (rows.length > 0) {
    rows.forEach((element) => {
      let user = { id: 0 };
      user.id = element.id;
      user.username = element.username;
      //user.password = element.password;
      user.email = element.email;
      user.age = element.age;
      user.gender = element.gender;
      userlist.push(user);
    });
  }
  return {
    isSuccess: true,
    message: "",
    data: { items: userlist , total: total },
  };
};

var delUserByIdAsync = async (idsString) => {
  const ids = idsString.split(",").map((id) => parseInt(id));
  const affectedRows = await userModel.destroy(
      {
        where: {
          id : {
            [Op.in]: ids
          }
        }
      }
  );

  return affectedRows > 0 ? {isSuccess: true, mesage: ""} : {isSuccess: false, mesage: ""};
}

var uptUserByIdAsync = async (user) => {
  const [result] = await userModel.update({
    username: user.username,
    email: user.email,
    address: user.address,
    age: user.age,
    gender: user.gender
  },{where: {id: user.id}});

  if (result > 0) {
    return { isSuccess: true, mesage: "" };
  }
  return { isSuccess: false, mesage: "" };
};

var checkUserNameAsync = async (uername, id) => {
  let result = await userModel.findAll({where:{username: uername}})
  let user = { id: 0 };
  if (result != null&& result.length > 0) {
    let oneUser = result[0]
    user.id = oneUser.id;
    user.username = oneUser.username;
    user.password = oneUser.password;
    user.email = oneUser.email;
    user.age = oneUser.age;
    user.gender = oneUser.gender;
  }

  if (user.id > 0 && user.id !== id) {
    return { isSuccess: false, message: "username already exists", data: user };
  }

  return { isSuccess: true, message: "", data: user };
};

var getUserbyIdAsync = async (id) => {
  let user = { id: 0 };
  let result = await userModel.findAll({where:{id: id}});
  if (result.length > 0) {
    let oneUser = result[0];
    user.id = oneUser.id;
    user.username = oneUser.username;
    user.password = oneUser.password;
    user.email = oneUser.email;
    user.age = oneUser.age;
    user.gender = oneUser.gender;
  }
  return { isSuccess: true, message: "", data: user };
};

module.exports = {
  getUserbyNameAsync,
  addUserAsync,
  getUserListAsync,
  delUserByIdAsync,
  uptUserByIdAsync,
  checkUserNameAsync,
  getUserbyIdAsync
};
