const sequelize = require("../config/database");
const User = require("./User");
const Book = require("./Book");
const BorrowedBook = require("./BorrowedBook");

// İlişkiler
User.hasMany(BorrowedBook, { foreignKey: "user_id", as: "borrowedBooks", onDelete: "CASCADE" });
BorrowedBook.belongsTo(User, { foreignKey: "user_id", as: "user" });

Book.hasMany(BorrowedBook, { foreignKey: "book_id", as: "borrowedBooks", onDelete: "CASCADE" });
BorrowedBook.belongsTo(Book, { foreignKey: "book_id", as: "book" });

module.exports = {
    sequelize,
    User,
    Book,
    BorrowedBook,
};
