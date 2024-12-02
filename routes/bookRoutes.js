const express = require('express');
const { getBooks, getBookInfo, createBook } = require('../controllers/bookController');

const router = express.Router();

router.get('/books', getBooks);
router.get('/books/:id', getBookInfo);
router.post('/books', createBook);

module.exports = router;
