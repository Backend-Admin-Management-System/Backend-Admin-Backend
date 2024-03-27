const {  DataTypes, where} = require("sequelize");
const { sequelize } = require("../db/sequelizedb");

const user = sequelize.define(
  "user",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.NUMBER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      //allowNull:false,
    },
    address: {
      type: DataTypes.STRING,
      //allowNull:false,
    },
    gender: {
      type: DataTypes.NUMBER,
      //allowNull:false,
    },
    age: {
      type: DataTypes.STRING,
      // allowNull:false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  { timestamps: false,tableName: 'user' }
);


module.exports = user;
