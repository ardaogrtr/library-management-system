const { Book } = require('../models/relations');

// List Books
const getBooks = async (req, res) => {
    try {
        const books = await Book.findAll();
        const result = books.map(book => ({
            id: book.id,
            name: book.name
        }));
        res.status(200).json(result);
    } catch (err) {
        console.error("Error fetching books:", err);
        res.status(500).json({ error: "Database error" });
    }
};

// View Book Information
const getBookInfo = async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findByPk(id);
        if (!book) return res.status(404).json({ error: "Book not found" });

        const result = {
            id: book.id,
            name: book.name,
            score: book.average_rating
        };
        res.status(200).json(result);
    } catch (err) {
        console.error("Error fetching book:", err);
        res.status(500).json({ error: "Database error" });
    }
};

// Create a New Book
const createBook = async (req, res) => {
    const { name, author } = req.body;

    if (!name) {
        return res.status(400).json({ error: "Book name is required" });
    }

    try {
        const newBook = await Book.create({
            name,
            author: author || 'Unknown',
            average_rating: -1,
            borrow_count: 0,
            is_borrowed: false,
        });

        res.status(201).json({
            id: newBook.id,
            name: newBook.name,
            author: newBook.author,
            average_rating: newBook.average_rating,
            borrow_count: newBook.borrow_count,
            is_borrowed: newBook.is_borrowed,
        });
    } catch (err) {
        console.error("Error creating book:", err);
        res.status(500).json({ error: "Database error" });
    }
};

module.exports = { getBooks, getBookInfo, createBook };
