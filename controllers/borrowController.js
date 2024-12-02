const { User, Book, BorrowedBook } = require('../models/relations');

// Borrow Book
const borrowBook = async (req, res) => {
    const { userId, bookId } = req.params;
    try {
        const [user, book] = await Promise.all([
            User.findByPk(userId),
            Book.findByPk(bookId),
        ]);

        if (!user) return res.status(404).json({ error: "User not found" });
        if (!book) return res.status(404).json({ error: "Book not found" });

        if (book.is_borrowed) {
            return res.status(400).json({ error: "Book is already borrowed" });
        }

        await book.update({
            is_borrowed: true,
        });

        book.borrow_count += 1;
        await book.save();

        const borrowedBook = await BorrowedBook.create({
            book_id: bookId,
            user_id: userId,
            borrow_date: new Date(),
        });

        res.status(200).json(borrowedBook);
    } catch (err) {
        console.error("Error borrowing book:", err);
        res.status(500).json({ error: "Database error" });
    }
};

// Return Book and Give Rating
const returnBook = async (req, res) => {
    const { userId, bookId } = req.params;
    const { score } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const book = await Book.findByPk(bookId);
        if (!book) {
            return res.status(404).json({ error: "Book not found" });
        }

        const borrowedBook = await BorrowedBook.findOne({
            where: { book_id: bookId, user_id: userId, return_date: null },
        });

        if (!borrowedBook) {
            return res.status(404).json({ error: "Book was not borrowed or has already been returned" });
        }

        borrowedBook.return_date = new Date();
        borrowedBook.rating = score;
        await borrowedBook.save();

        const totalScore = book.average_rating * book.borrow_count + score;
        const newAverageRating = totalScore / (book.borrow_count + 1);

        await book.update({
            is_borrowed: false,
            average_rating: newAverageRating,
            borrow_count: book.borrow_count + 1,
        });

        res.status(200).json({ message: "Book successfully returned and rated" });
    } catch (err) {
        console.error("Error returning book:", err);
        res.status(500).json({ error: "Database error" });
    }
};

module.exports = { borrowBook, returnBook };
