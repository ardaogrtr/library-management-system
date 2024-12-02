const express = require('express');
const { getUsers, getUserInfo, createUser } = require('../controllers/userController');

const router = express.Router();

router.get('/users', getUsers);
router.get('/users/:id', getUserInfo);
router.post('/users', createUser);

module.exports = router;
