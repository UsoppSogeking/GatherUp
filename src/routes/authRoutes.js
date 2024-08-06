const express = require('express');
const router = express.Router();
const { Register, Login, Delete } = require('../controllers/authController');

router.post("/auth/register", Register);
router.post("/auth/login", Login);
router.delete("/auth/delete/:userId", Delete);

module.exports = router;