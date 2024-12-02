const express = require('express');
const userRoutes = require('./userRoutes');
const bookRoutes = require('./bookRoutes');
const borrowRoutes = require('./borrowRoutes');

const router = express.Router();

router.use(userRoutes);
router.use(bookRoutes);
router.use(borrowRoutes);

module.exports = router;
