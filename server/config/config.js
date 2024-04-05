const Sequelize = require("sequelize");

const database = new Sequelize({
  database: process.env.DATABASE,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  dialect: "mysql",
});

module.exports = database;
