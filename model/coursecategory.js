const {  DataTypes, where} = require("sequelize");
const { sequelize } = require("../db/sequelizedb");

const courseCategory = sequelize.define(
    "courseCategory",
    {
        categoryid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        categoryname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        categorylevel: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        categoryparentid: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },{timestamps:false, tableName:'courseCategory'}
);

module.exports = courseCategory;

/*
Create table
courseCategory.sync({force:true});
console.log('create new table courseCategory');
*/
