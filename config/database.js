module.exports = async function configDB() {
  require("dotenv").config();
  const DB_NAME = process.env.DB_NAME || "my_game";
  const DB_USERNAME = process.env.DB_USERNAME || "root";
  const DB_PASSWORD = process.env.DB_PASSWORD || "TIN123";
  const DB_HOST = process.env.DB_HOST || "127.0.0.1";
  const DIALECT_URL = process.env.DIALECT_URL || "mysql";
  const Sequelize = require("sequelize");
  const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    dialect: DIALECT_URL,
  });

  sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch((error) => {
      console.error("Unable to connect to the database: ", error);
    });
};
