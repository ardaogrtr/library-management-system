const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Book = sequelize.define("Book", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    average_rating: {
        type: DataTypes.DECIMAL(3, 2),
        defaultValue: -1,
    },
    isBorrowed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false, // The book is initially considered not borrowed.
    },
    borrow_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
});

module.exports = Book;