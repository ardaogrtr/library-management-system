const { User, BorrowedBook, Book } = require('../models/relations');

// List Users
const getUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'name'],
        });
        res.status(200).json(users);
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).json({ error: "Database error" });
    }
};

// View User Information
const getUserInfo = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id, {
            include: {
                model: BorrowedBook,
                as: 'borrowedBooks',
                include: {
                    model: Book,
                    as: 'book',
                    attributes: ['name'],
                },
            },
        });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const borrowedBooks = user.borrowedBooks.reduce(
            (acc, borrowedBook) => {
                const book = {
                    name: borrowedBook.book.name,
                };

                if (borrowedBook.return_date) {
                    acc.past.push({
                        name: borrowedBook.book.name,
                        userScore: borrowedBook.rating || null,
                    });
                } else {
                    acc.present.push({
                        name: borrowedBook.book.name,
                    });
                }

                return acc;
            },
            { past: [], present: [] }
        );

        const result = {
            id: user.id,
            name: user.name,
            books: borrowedBooks,
        };

        res.status(200).json(result);
    } catch (err) {
        console.error("Error fetching user:", err);
        res.status(500).json({ error: "Database error" });
    }
};

// Create New User
const createUser = async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: "User name is required" });
    }

    try {
        const newUser = await User.create({ name });
        res.status(201).json({
            id: newUser.id,
            name: newUser.name,
        });
    } catch (err) {
        console.error("Error creating user:", err);
        res.status(500).json({ error: "Database error" });
    }
};

module.exports = { getUsers, getUserInfo, createUser };
