const express = require('express');
const router = express.Router();
const { getUsers, getUser, updateUser } = require('../controllers/userController');

router.get('/users', getUsers);
router.get('/users/:userId', getUser);
router.put('/users/:userId', updateUser);

module.exports = router;