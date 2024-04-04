const Sequelize = require("sequelize");

const database = new Sequelize({
  database: "varthana",
  username: "root",
  password: "123456",
  dialect: "mysql",
});

module.exports = database;
