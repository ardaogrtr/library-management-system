const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const BorrowedBook = sequelize.define("BorrowedBook", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    borrow_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    return_date: {
        type: DataTypes.DATE,
        allowNull: true, // The book can be null if it has not been returned yet
    },
    book_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: true, // Initially null, indicating no rating has been given
        validate: {
            min: 1, // Rating cannot be less than 1
            max: 10, // Rating cannot be more than 10
        },
    },
}, {
    tableName: "borrowed_books",
    timestamps: false,
});

module.exports = BorrowedBook;
