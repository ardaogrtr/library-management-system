# Library Management API

This project implements a REST API for managing users and books in a library. The application supports the basic library operations such as adding users, listing users and books, borrowing and returning books, and giving ratings to borrowed books.

## Features

- **User Management:**
  - List users
  - View user details, including past borrowed books and their ratings, as well as current borrowed books
  - Create new users

- **Book Management:**
  - List books
  - View book details, including the name and average rating
  - Create new books

- **Borrowing & Returning Books:**
  - Borrow a book
  - Return a book and give a rating

## Technical Requirements

- **Version Control:** Use a version control system (e.g., Git) for code management.
- **Backend Framework:** Node.js with the Express.js library.
- **Database:** Any relational database management system (e.g., MySQL).
- **ORM/Query Builder:** Use an ORM or query builder like Sequelize.
- **Validation:** Validate API request bodies using a validation library (e.g., Joi, express-validator).
- **Error Handling:** Handle errors effectively, ensuring that errors are returned with appropriate HTTP status codes (e.g., 500 Internal Server Error).

## Prerequisites

Make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/en/) (v14 or later)
- [npm](https://www.npmjs.com/) (Node.js package manager)
- PostgreSQL (or any relational database of your choice)

## Project Setup and Running

### 1. Clone the Repository
First, clone the repository to your local machine, create a database.
## Set Up Environment Variables
Create a .env file in the root of the project directory. The .env file should contain the following variables:

DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
DB_PORT=your_database_port
PORT=your_preferred_port  # e.g., 3000

- After run 'npm install'
- Finally run 'npm start' 

## API Endpoints

### User Management

- `GET /users`: List all users
- `GET /users/{userId}`: Get details of a specific user (name, borrowed books, and ratings)
- `POST /users`: Create a new user

### Book Management

- `GET /books`: List all books
- `GET /books/{bookId}`: Get details of a specific book (name and average rating)
- `POST /books`: Create a new book

### Borrowing & Returning Books

- `POST /users/{userId}/borrow/{bookId}`: Borrow a book
- `POST /users/{userId}/return/{bookId}`: Return a borrowed book and give a rating

## Assumptions

The following assumptions have been made while designing and developing this API:

- **User Management:**
  - Each user is identified by a unique ID, and their name is the only attribute required during creation.
  - A user can borrow multiple books, but they cannot borrow the same book more than once simultaneously.
  - Users can rate books they have borrowed, and the rating will be stored for future reference.

- **Book Management:**
  - Each book is identified by a unique ID, and the name is the primary attribute required for book creation.
  - The average rating of a book is calculated from the ratings given by users after they return the book.
  - Book names are stored as strings, and there is no restriction on the length of the book name, although it should be kept reasonable.

- **Borrowing & Returning Books:**
  - Books can be borrowed only if they are not currently borrowed by another user.
  - A book can only be returned if it was previously borrowed by the user.
  - Upon returning a book, the user is required to provide a rating, which will be stored for future calculations of the book’s average rating.
  - The borrow and return operations are timestamped to track when a book was borrowed or returned.
  - Rating is between 1-10

- **Database Design:**
  - The database schema assumes that each user can borrow multiple books but a book can only be borrowed by one user at a time.
  - The `borrowed_books` table keeps track of which books are borrowed, when they were borrowed, when they were returned, and the rating provided by the user.
  - In case of a deleted user or book, the related records in the `borrowed_books` table will also be deleted due to the foreign key cascading delete rule.

- **Error Handling:**
  - The API assumes that proper error handling is required for cases such as trying to borrow a non-existent book, borrowing a book that is already borrowed, or submitting invalid data.
  - All errors should be returned with appropriate HTTP status codes and detailed error messages to help users understand the problem.

These assumptions help in providing a simple yet functional library management system. Adjustments and enhancements may be required based on further functional requirements or business logic.

## Database Setup
I used MySQL for this task.
The database schema is created using a relational database system. The following DDL script will create the necessary tables for the system:

### DDL Script

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  average_rating DECIMAL(3, 2) DEFAULT 0.00
);

CREATE TABLE borrowed_books (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  book_id INT REFERENCES books(id) ON DELETE CASCADE,
  borrow_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  return_date TIMESTAMP,
  rating DECIMAL(3, 2),
  UNIQUE(user_id, book_id)
);
