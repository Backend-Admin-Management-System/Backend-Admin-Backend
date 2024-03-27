
const { db } = require("../db/mysqldb.js");

var getUserbyNameAsync = async (name) => {
  let sql = "SELECT * FROM user where username=? ";
  let result = await db.query(sql, [name]);
  let user = { id: 0 };
  if (result[0].length > 0) {
    user.id = result[0][0].id;
    user.username = result[0][0].username;
    user.password = result[0][0].password;
    user.email = result[0][0].email;
    user.age = result[0][0].age;
    user.gender = result[0][0].gender;
  }
  return { isSuccess: true, message: "", data: user };
};

var addUserAsync = async (user) => {
  let sql =
    "insert into user(username,password,email,address,age,gender) values (?,?,?,?,?,?)";
  let result = await db.query(sql, [
    user.username,
    user.password,
    user.email,
    user.address,
    user.age,
    user.gender,
  ]);
  return { isSuccess: true, message: "" };
};

var getUserListAsync = async (page, pageSize) => {
  let countSql = "SELECT count(*) total FROM user; ";
  let resultCount = await db.query(countSql);
  let total = resultCount[0][0].total;
  if (total == 0) {
    return { isSuccess: true, message: "", data: { items: [], total: 0 } };
  }
  let sql = "SELECT * FROM user limit ? offset ? ;";
  let resultData = await db.query(sql, [pageSize, (page - 1) * pageSize]);

  let userlist = [];
  if (resultData[0].length > 0) {
    resultData[0].forEach((element) => {
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
    data: { items: userlist, total: total },
  };
};

const delUserByIdAsync = async (idsString) => {
  const ids = idsString.split(",").map((id) => parseInt(id));
  let sql = "Delete FROM user where id in (?); ";
  let reuslt = await db.query(sql, [ids]);
  if (reuslt[0].affectedRows > 0) {
    return { isSuccess: true, mesage: "" };
  }

  return { isSuccess: false, mesage: "" };
};

var uptUserByIdAsync = async (user) => {
  let sql =
    "Update user set username=?,email=?,address=?,age=?,gender=? where id =?";
  let result = await db.query(sql, [
    user.username,
    user.email,
    user.address,
    user.age,
    user.gender,
    user.id,
  ]);
  if (result[0].affectedRows > 0) {
    return { isSuccess: true, mesage: "" };
  }
  return { isSuccess: false, mesage: "" };
};

var checkUserNameAsync = async (uername, id) => {
  let sql = "SELECT * FROM user where username=? ";
  let result = await db.query(sql, [uername]);
  let user = { id: 0 };
  if (result[0].length > 0) {
    user.id = result[0][0].id;
    user.username = result[0][0].username;
    user.password = result[0][0].password;
    user.email = result[0][0].email;
    user.age = result[0][0].age;
    user.gender = result[0][0].gender;
  }

  if (user.id > 0 && user.id !== id) {
    return { isSuccess: false, message: "username already exists", data: user };
  }

  return { isSuccess: true, message: "", data: user };
};

var getUserbyIdAsync = async (id) => {
  let sql = "SELECT * FROM user where id=? ";
  let result = await db.query(sql, [id]);
  let user = { id: 0 };
  if (result[0].length > 0) {
    user.id = result[0][0].id;
    user.username = result[0][0].username;
    user.password = result[0][0].password;
    user.email = result[0][0].email;
    user.age = result[0][0].age;
    user.gender = result[0][0].gender;
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
