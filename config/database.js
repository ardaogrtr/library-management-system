require("dotenv").config(); // Loads environment variables
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    dialect: "mysql",
    logging: false, // Disable SQL query logging in the console (optional)
});

module.exports = sequelize;
