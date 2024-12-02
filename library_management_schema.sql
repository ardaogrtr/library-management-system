
---

*DDL Script* 
sql
-- Create Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Create Books Table
CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    author VARCHAR(255),
    average_rating DECIMAL(3, 2) DEFAULT -1,
    borrow_count INT DEFAULT 0,
    is_borrowed BOOLEAN DEFAULT FALSE
);

-- Create BorrowedBooks Table
CREATE TABLE borrowed_books (
    id SERIAL PRIMARY KEY,
    book_id INT REFERENCES books(id) ON DELETE CASCADE,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    borrow_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    return_date TIMESTAMP NULL,
    rating INT CHECK (rating BETWEEN 1 AND 10)
);
